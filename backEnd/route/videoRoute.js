import express from "express";
import { 
  postVideo, 
  viewVideo, 
  likeVideo, 
  dislikeVideo, 
  commentOnVideo, 
  subscribeToChannel, 
  unsubscribeFromChannel, 
  viewSubscribedChannels, 
  recommendedVideos, 
  mostViewedVideos 
} from "../controllers/videoController.js"; // Import the controller functions
import { verify } from "../middleware/auth.js"; // Import authentication middleware
import { upload } from "../middleware/multer.js"; // Import multer middleware for file uploads

const router = express.Router();

// Route to post a new video (requires authentication and file upload)
// Using upload.array() to handle multiple video files
router.post("/videos", verify, upload.fields([{ name: 'video', maxCount: 5 }, { name: 'img', maxCount: 1 }]), postVideo); 
// Allow multiple video uploads (up to 5) and a single image (thumbnail)

// Route to get a single video and its comments 
router.get("/videos/:id", viewVideo);

// Route to like a video (requires authentication)
router.put("/videos/like/:id", verify, likeVideo);

// Route to dislike a video (requires authentication)
router.put("/videos/dislike/:id", verify, dislikeVideo);

// Route to add a comment to a video (requires authentication)
router.post("/videos/:id/comments", verify, commentOnVideo);

// Route to subscribe to a channel (requires authentication)
router.post("/videos/subscribe", verify, subscribeToChannel);

// Route to unsubscribe from a channel (requires authentication)
router.post("/videos/unsubscribe", verify, unsubscribeFromChannel);

// Route to view videos from subscribed channels
router.get("/videos/subscribed", verify, viewSubscribedChannels);

// Route to view recommended videos
router.get("/videos/recommended", recommendedVideos);

// Route to get the most viewed videos
router.get("/videos/most-viewed", mostViewedVideos);

export default router;
