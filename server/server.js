import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import ensureAdminUser from "./utils/ensureAdminUser.js";
import ensureDefaultProducts from "./utils/ensureDefaultProducts.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : true,
    credentials: true,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ensureAdminUser();
    await ensureDefaultProducts();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();
