import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import roleRouter from "./route/role.route.js";
import userRouter from "./route/user.route.js";
import messageRouter from "./route/message.routes.js";
import PropertyRouter from "./route/property.routes.js";
import errorHandler from "./middleware/error.handler.js";
import  connectDB   from "./config/db.js";
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Dynamically use the CORS origin from environment
  credentials: true, // Allow cookies and credentials
}));
app.use('/uploads', express.static('uploads')); // Static file serving for uploaded files

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("App started");
});

// Global Error Handling (Consolidated)
app.use(errorHandler);

// MongoDB Connection
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
});
try {
  connectDB()
} catch (error) {
  next(error);
}
app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use('/api/message', messageRouter);
app.use('/api/property', PropertyRouter);

// Start the Server

// Graceful Shutdown: Catch signals for cleanup
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully due to SIGTERM...");
  await mongoose.disconnect();
  process.exit(0);
});
