require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateUser  = async (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log("Token received:", token); // Log the token for debugging

    if (!token) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        console.log("User  verified:", req.user); // Log the verified user
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Log the error
        res.status(401).json({
            message: "Invalid token",
        });
    }
};

module.exports =  authenticateUser ;