import jwt from "jsonwebtoken";

const generateToken = (id,role) => {
    // Ensure the JWT secret is provided
  
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    // Generate a token with an expiration time
    return jwt.sign({ id,role }, process.env.JWT_SECRET);
};

export default generateToken;
