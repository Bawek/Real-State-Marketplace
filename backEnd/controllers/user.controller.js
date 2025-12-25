import { userModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../middleware/generateToken.js";
import createError from "../middleware/create.error.js";

// Register a new user
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Ensure all required fields are provided
        if (!name || !email || !password) {
            return next(createError(400, "Enter all fields"));
        }

        // Check if the user already exists by email
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return next(createError(400, "User already exists"));
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 12);


        // Create new user
        const newUser = new userModel({ name, email, password: hashedPassword, role, photo: req.file ? req.file.filename : undefined });
        await newUser.save();

        // Generate a JWT token for the user

       

        return res.status(201).json({ success: true, message: "User registered successfully.", newUser });
    } catch (err) {
        console.error("Error registering user:", err);
        next(err);
    }
};

// Login an existing user
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Ensure both email and password are provided
        if (!email || !password) {
            return next(createError(400, "Please provide email and password."));
        }

        // Find the user by email
        const user = await userModel.findOne({ email }).populate("role");
        if (!user) {
            return next(createError(404, "User not found."))
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createError(401, "Invalid credentials."));
        }

        // Generate a JWT token
        console.log(user._id, user.role.name, "Generating token for user:");
        const token = generateToken({ id: user._id, role: user.role.name });
        console.log(token, "Generated Token");

        // Send the token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours expiration
        });

        // Respond with user data and the token
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: { name: user.name, id: user._id, role: user.role },
        });
    } catch (err) {
        console.error("Login Error:", err);
        next(err);
    }
};

// Logout user
export const logout = async (req, res, next) => {
    try {
        // Clear the token cookie
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production", // Match cookie settings
        });

        res.status(200).json({ success: true, message: "Successfully logged out." });
    } catch (error) {
        console.error("Logout Error:", error);
        next(error)
    }
};

// Change password
// Change password
export const changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    console.log(req.user, "user");
    console.log(req.user.id, "user");
    const userId = req.user.id
    console.log("userId", userId);

    try {
        const user = await userModel.findById(userId); // `req.user.id` comes from the token

        if (!user) {
            return next(createError(404, "User not found."));
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {

            return next(createError(401, "Current password is incorrect."));
        }

        // Check if the new password is the same as the current password
        if (currentPassword === newPassword) {
            return next(createError(404, "New password cannot be the same as the current password."));
        }

        // Hash the new password and update it
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password changed successfully." });
    } catch (err) {
        console.error("Change Password Error:", err);
        next(err);
    }
};

// Update profile (change name, email, or password)
export const updateProfile = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        const user = await userModel.findById(req.user.id); // `req.user.id` comes from the token

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) {
            user.role = role;
        }
        if (password) {
            // Hash the new password if it's being changed
            user.password = await bcrypt.hash(password, 12);
        }
        if (req.file) {
            user.photo = req.file.filename || user.photo;
        }
        await user.save();

        res.status(200).json({ success: true, message: "Profile updated successfully.", user });
    } catch (err) {
        console.error("Update Profile Error:", err);
        res.status(500).json({ success: false, message: "An error occurred while updating the profile." });
    }
};

// Get all users (Admin only)
export const get = async (req, res, next) => {
    try {
        const users = await userModel.find({}).populate("role");
        if (users && users.length > 0) {
            res.status(200).json({
                success: true,
                message: "Users fetched successfully.",
                users,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No users found.",
            });
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching users." });
    }
};

// Remove a user by ID (Admin only)
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await userModel.findByIdAndDelete(id);
        if (response) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully.",
                user: response,
            });
        } else {
            res.status(404).json({ success: false, message: "User not found." });
        }
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ success: false, message: "An error occurred while deleting the user." });
    }
};

// Update a user by ID (Admin only) - can be used to promote to admin or change user role
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const response = await userModel.findByIdAndUpdate(id, { role }, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (response) {
            res.status(200).json({
                success: true,
                message: "User updated successfully.",
                user: response,
            });
        } else {
            res.status(404).json({ success: false, message: "User not found." });
        }
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the user.", error });
    }
};
export const getUserByID=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const user=await userModel.findById(id).populate("role");
        if (user){
            res.status(200).json({success:true,message:"user fetched successfully",user});
        }
        else{
            return next(createError(404,"User not found"));
        }
    } catch (error) {
        next(error);
    }
}