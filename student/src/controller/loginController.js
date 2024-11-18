require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../../db");
const bcrypt = require("bcrypt");

// Generate access token
const generateAccessToken = (userRole) => {
    return jwt.sign({ userRole }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
};

// Generate refresh token
const generateRefreshToken = (userRole) => {
    return jwt.sign({ userRole }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Query database for the user
        const findUsernameQuery = "SELECT * FROM student WHERE username = ?";
        const [usernameResult] = await db.query(findUsernameQuery, [username]);

        // Check if user exists
        if (usernameResult.length === 0) {
            return res.status(401).json({
                message: "Username not found",
            });
        }

        const user = usernameResult[0];

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password",
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user.role_id);
        const refreshToken = generateRefreshToken(user.role_id);

        // Set cookies and send response
        res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure:false, // Secure only in production
                maxAge: 50 * 80 * 1000, // 30 minutes
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure:false, // Secure only in production
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .cookie("role_id", user.role_id, {
                httpOnly: true,
                sameSite: "strict",
                secure:false, // Secure only in production
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .json({
                message: "Login successful",
                role_id: user.role_id,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
