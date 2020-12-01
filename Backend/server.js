import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import connectDB from "./config/connectDB.js";
import morgan from "morgan";
import Productrouter from "./routes/productRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import OrderRouter from "./routes/orderRoutes.js";
import UploadRouter from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", Productrouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/upload", UploadRouter);

app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is Running...");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);
