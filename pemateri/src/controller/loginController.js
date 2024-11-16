require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../../db");
const bcrypt = require("bcrypt");

const ROLE = {
    ADMIN: 1,
    STUDENT: 2,
    PEMATERI: 3,
};

const isProduction = process.env.NODE_ENV === "production";

const generateAccessToken = (userId, userRole) => {
    return jwt.sign({ userId, userRole }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
};

const generateRefreshToken = (userId, userRole) => {
    return jwt.sign({ userId, userRole }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const query = "SELECT * FROM pemateri WHERE username = ?";
        const [rows] = await db.query(query, [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Username not found" });
        }

        const user = rows[0];

        // Ensure user is a Pemateri
        if (user.role_id !== ROLE.PEMATERI) {
            return res.status(401).json({
                message: "You are not authorized as a Pemateri. Please register.",
            });
        }

        // Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user.id, user.role_id);
        const refreshToken = generateRefreshToken(user.id, user.role_id);

        // Set cookies and send response
        res.status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: isProduction,
                maxAge: 30 * 60 * 1000, // 30 minutes
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: isProduction,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .json({
                message: "Login successful",
                userId: user.id,
                roleId: user.role_id,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
