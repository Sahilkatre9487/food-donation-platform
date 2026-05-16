import express, { Router } from "express";
import cors from "cors"; // ✅ Make sure cors is imported
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Serve uploads statically
app.use("/uploads", express.static(uploadsDir));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => res.send("Food donation server running"));

if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.join(__dirname, "dist");
  app.use(express.static(clientDistPath));

  const router = Router();
  router.use((req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
  app.use(router);
}


// Database connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log("Server listening on", port));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
