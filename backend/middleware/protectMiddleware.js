import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/envVars.js";
import { User } from "../models/user.js";

export const protectRoutes = async (req, res, next) => {
    try {
        // Correct way to access cookies
        const token = req.cookies["jwt-netflix"];
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        // Verifying the token with the secret and decoding it
        const decoded = jwt.verify(token, ENV_VAR.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Token verification failed" });
        }

        // Fetch user from database using the decoded token's userId
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Attaching user to the request object for access in next middleware
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
