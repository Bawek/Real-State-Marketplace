import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Haile"
  },
  password: {
    type: String,
    required: true,
    default: "123"
  },
  email: {
    type: String,
    required: true,
    default: "Haile@gmail.com"
  }, photo: String,
  
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  
  }
});

// Prevent model overwrite error in dev mode
export const userModel = mongoose.models.User || mongoose.model("User", userSchema);
