import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import commentRouter from "./route/commentRoute.js";
import userRouter from "./route/user.route.js";

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
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);

// Global Error Handling (Consolidated)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the stack trace for debugging
  const message = err.message || "Unknown server error occurred";
  const status = err.status || 500; // Default to 500 if no status is set
  res.status(status).json({ success: false, message, status });
});

// MongoDB Connection
const connectDB = async () => {
  let retries = 5; // Retry logic
  while (retries) {
    try {
      await mongoose.connect(url);
      console.log(`Connected to MongoDB at ${url}`);
      break;
    } catch (error) {
      console.error("Failed to connect to MongoDB, retrying...", error.message);
      retries -= 1;
      if (retries === 0) {
        process.exit(1); // Exit after retry attempts are exhausted
      }
      await new Promise(res => setTimeout(res, 5000)); // Retry after 5 seconds
    }
  }
};

// Start the Server
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB();
});

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
