import commentModel from "../model/commentModel.js"; // Fix typo in 'comentModel' to 'commentModel'

// Add a new comment
const postComment = async (req, res) => {
  try {
    // Validate input (you can enhance validation as needed)
    const { comment, userId, postId } = req.body;

    // Basic validation for missing fields
    if (!comment || !userId || !postId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: comment, userId, or postId.",
      });
    }

    // Create the comment entry in the database
    const newComment = await commentModel.create({
      comment,
      userId,
      postId,
    });

    // Send success response if the comment is created
    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Failed to add comment.",
      error: error.message, // Avoid exposing full error details in production
    });
  }
};

// Retrieve all comments
const getComment = async (req, res) => {
  try {
    // Optionally, you could add filtering logic (e.g., by post ID)
    const { postId } = req.query; // If querying by postId

    let filter = {};
    if (postId) {
      filter = { postId }; // Filter comments by postId if provided
    }

    // Fetch comments and populate associated user and post details
    const data = await commentModel
      .find(filter)
      .populate("userId", "name email") // Populate user information (name, email)
      .populate("postId", "title content"); // Populate post details (e.g., title, content)

    if (data && data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Comments retrieved successfully.",
        data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No comments found.",
      });
    }
  } catch (error) {
    console.error("Error retrieving comments:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve comments.",
      error: error.message, // Avoid exposing full error details in production
    });
  }
};

export { postComment, getComment };
