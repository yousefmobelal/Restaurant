import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./src/routes/user.routes.js";
import restaurantRoutes from "./src/routes/restaurant.routes.js";
import AppError from "./src/utils/appError.js";
import globalErrorHandler from "./src/middlewares/errorController.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.all("*all", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(globalErrorHandler);

export default app;
