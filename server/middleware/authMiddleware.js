const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Protect middleware to authenticate users
exports.protect = async (req, res, next) => {
    try {
        console.log("BEFORE TOKEN EXTRACTION");

        let token;

        // Extract token from various sources
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.body && req.body.token) {
            token = req.body.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1]; 
        }

        console.log("AFTER TOKEN EXTRACTION");

        // If token is missing, return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
            req.user = decoded.user; // Store the user object from decoded token
        } catch (err) {
            // Token verification issue
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }

        next();
    } catch (error) {
        console.error("Token Validation Error:", error);
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token!',
        });
    }
};

// Admin middleware to restrict access to admin users
exports.admin = async (req, res, next) => {
    try {
        console.log("Printing Role:", req.user && req.user.role);
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only",
            });
        }
    } catch (error) {
        console.error("Admin Access Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while checking admin access",
        });
    }
};
