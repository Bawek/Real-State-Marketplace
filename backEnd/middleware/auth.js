import jwt from "jsonwebtoken";
import createError from "../error.js";

export const verify = async (req, res, next) => {
    try {
        // Ensure req.cookies is defined
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ success: false, message: "No token provided." });
        }
        // Access the token from cookies
        const token = req.cookies.token;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(401).json(createError(400,"Eror in token"));
            }
            req.user=user.id
        });
    
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        
        res.status(400).json({ success: false, message: "Token verification failed.", error});
    }
};
export  const isAdmin = (req, res, next) => {
    try {
        console.log(req.role);
        // Check if the user's role is "admin"
        if (req.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied: Admins only." });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        res.status(500).json({ success: false, message: "An error occurred while verifying admin access." });
    }
};

