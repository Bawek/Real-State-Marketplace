import React, { useState } from "react";
import { usePostCommentMutation } from "../redux/features/comments/commentApi";
import { useSelector } from "react-redux";
import {useFetchVideoByIdQuery } from "../redux/features/blogs/blogsApi";
import { useParams } from "react-router-dom";

const Comment = () => {
  const [commentText, setCommentText] = useState(""); // Use a single string state for the comment
  const { user } = useSelector((state) => state.auth); // Fetch user from auth slice
  const [postComment] = usePostCommentMutation(); // Correctly call the mutation hook
  const { id } = useParams();
  const { refetch } = useFetchVideoByIdQuery(id) // Use the `refetch` method to reload blogs

  const handleAddComment = async () => {
    if (!user) {
      alert("You need to be logged in to post a comment.");
      return;
    }

    const newComment = {
      comment: commentText, // The text of the new comment
      user: user?.id, // The user's ID
      post: id, // The ID of the post being commented on
    };
console.log(newComment);
    try {
      const res = await postComment(newComment).unwrap(); // Pass comment data as an object
      if (res) {
        alert("Comment posted successfully!");
        setCommentText(""); // Reset the input field
        refetch(); // Reload the post to show the new comment
        console.log("Response:", res);
      }
    } catch (error) {
      console.error("Error occurred while posting comment:", error);
    }
  };

  return (
    <div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Add a Comment:</h2>
        <div className="flex flex-col">
          <textarea
            value={commentText} // Bind textarea to `commentText`
            onChange={(e) => setCommentText(e.target.value)} // Update state on change
            className="p-2 border border-gray-300 rounded-lg mt-2"
            placeholder="Write your comment..."
          />
          <button
            onClick={handleAddComment}
            className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
