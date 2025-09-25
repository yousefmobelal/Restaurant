import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./src/routes/user.routes.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import AppError from "./src/utils/appError.js";
import globalErrorHandler from "./src/middlewares/errorController.js";
import { swaggerUi, swaggerSpec } from "./src/utils/swagger.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.all("*all", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(globalErrorHandler);

export default app;
