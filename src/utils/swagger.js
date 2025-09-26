import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const url =
  process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}/api/`;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Docs for My API",
    },
    servers: [
      { url, description: url.includes("localhost") ? "Local server" : "" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["src/routes/*.js", "src/controllers/*.js", "docs/*.js"],
  myKey: path.join(process.cwd(), "/hello"),
};

const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi, swaggerSpec };
