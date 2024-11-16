require("dotenv").config();
const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verify the token using the ACCESS_TOKEN_SECRET
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Attach the decoded user data to the request object

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If token verification fails, respond with a 403 (Forbidden) status
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authUser;
