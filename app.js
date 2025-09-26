import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./src/routes/user.routes.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import foodRoutes from "./src/routes/food.routes.js";
import AppError from "./src/utils/appError.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.js";
import { swaggerUi, swaggerSpec } from "./src/utils/swagger.js";

const app = express();

app.use(express.json());
app.use(cors());
app.options("*all", cors());
app.use(helmet());

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);

app.all("*all", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(globalErrorHandler);

export default app;
