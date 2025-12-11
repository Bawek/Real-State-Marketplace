import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment text is required."], // Custom error message
      trim: true, // Removes leading/trailing spaces
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for references
      ref: "user", // Reference the user collection
      required: [true, "User ID is required."],
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for references
      ref: "video", // Reference the video collection
      required: [true, "Video ID is required."],
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const commentModel = mongoose.models.comment || mongoose.model("comment", commentSchema);

export default commentModel;
