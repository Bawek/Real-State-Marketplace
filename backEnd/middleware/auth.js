import jwt, { decode } from "jsonwebtoken";
import createError from "./create.error.js";

export const verify = async (req, res, next) => {
    try {
        // Ensure req.cookies is defined
        if (!req.cookies || !req.cookies.token) {
            return next(createError(401, "No token provided."));
        }
        // Access the token from cookies
        const token = req.cookies.token;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log(req.user.role, "🔐 Token verified successfully:", decoded);


        next();
    } catch (error) {
        console.error("Token Verification Error:", error);

        res.status(400).json({ success: false, message: "Token verification failed.", error });
    }
};
export const isAdmin = (req, res, next) => {
    try {
        console.log(req.user.role, "👑 Checking admin privileges...");
        // Check if the user's role is "admin"
        if (req.user.role?.toLowerCase() !== "admin") {
            return next(createError(403, "Access denied"));
        }


        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        res.status(500).json({ success: false, message: "An error occurred while verifying admin access." });
    }
};

