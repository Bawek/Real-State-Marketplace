import express from "express";
import { register, login, get, remove, update, changePassword, updateProfile, logout } from "../controllers/user.controller.js";
import  {verify, isAdmin} from "../middleware/auth.js";  // Import verify and admin middlewares
import upload from "../Config/db/multer.js";

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
router.get("/users", verify,isAdmin, get);  // Get all users (admins only can access this)
router.get("/users", verify, get);  // Get all users (admins only can access this)
router.delete("/user/:id", verify, isAdmin, remove);       // Delete user by ID
router.put("/user/:id", verify, isAdmin, update);          // Update user (e.g., promote to admin)

// Example admin-only route
router.post("/admin/create-user", verify, isAdmin, async (req, res) => {
    // Admin-only route to create a new user
    const { name, email, password } = req.body;

    try {
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ success: true, message: "User created successfully.", data: newUser });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ success: false, message: "Error creating user." });
    }
});

export default router;
