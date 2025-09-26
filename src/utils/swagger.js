import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import "../../docs/components.js";
import "../../docs/food.docs.js";
import "../../docs/restaurant.docs.js";
import "../../docs/user.docs.js";

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
      {
        url,
        description: url.includes("localhost")
          ? "Local server"
          : "Production server",
      },
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
  apis: [path.resolve("docs/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
