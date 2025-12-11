import express from "express";
import { getComment, postComment } from "..//controllers/commentControler.js"; // Fix typo in 'controller'
import { verify } from "../middleware/auth.js"; // Optional: Import auth middleware to verify user

const commentRouter = express.Router();

// Route to post a new comment (Requires authentication)
commentRouter.post("/comments", verify, postComment);

// Route to get all comments (Optionally, you could filter by postId or userId if needed)
commentRouter.get("/comments", getComment);

export default commentRouter;
