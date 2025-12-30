import express from "express";
import { register, login, get, remove, update, changePassword, updateProfile, logout, getUserByID } from "../controllers/user.controller.js";
import  {verify, isAdmin} from "../middleware/auth.js";  // Import verify and admin middlewares
import upload from "../Config/multer.js";

const router = express.Router();

// Public Routes
// router.post("/register", upload.single("photo"), register); 
router.post(
  "/register",
  (req, res, next) => {
    upload.single("photo")(req, res, function (err) {
      if (err) {
        console.error("❌ Multer Error:", err);

        return res.status(400).json({
          message: "File upload failed",
          error: err.message,
        });
      }
      next();
    });
  },
  register
);

// User registration
router.post("/login",login);        // User login
router.post('/logout', logout);


// Protected Routes (Requires Authentication)
router.put("/change-password", verify, changePassword); // Change password
router.put("/update-profile", verify, updateProfile);   // Update profile (name, email, etc.)

// Admin Routes (Requires Admin Role)
router.get("/get-all-users", verify,isAdmin, get);  // Get all users (admins only can access this)
router.get("/get-single-user:id", verify, getUserByID);  // get user by ID
router.delete("/remove:id", verify, isAdmin, remove);       // Delete user by ID
router.put("/update-role:id", verify, isAdmin, update);          // Update user (e.g., promote to admin)




export default router;
