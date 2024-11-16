require("dotenv").config();
const db = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Generate a refresh token
const generateRefreshToken = (userRole) => {
    return jwt.sign({ userRole }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// Helper function to format date as "day-month-year"
const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${monthName}-${year}`;
};
exports.register = async (req, res) => {
    try {
        console.log("Request received:", req.body);

        const { username, password, studentName } = req.body;

        // Validate request body
        if (!username || !password || !studentName) {
            console.error("Validation failed: Missing fields");
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }

        if (username.length < 6) {
            console.error("Validation failed: Username too short");
            return res.status(400).json({
                message: "Username must be at least 6 characters",
            });
        }

        if (password.length < 8) {
            console.error("Validation failed: Password too short");
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        }

        // Check if username already exists
        const findSameUsername = "SELECT * FROM student WHERE username = ?";
        const [findUsername] = await db.query(findSameUsername, [username]);

        if (findUsername.length > 0) {
            console.error("Validation failed: Username already exists");
            return res.status(400).json({
                message: "Username already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        // Generate refresh token
        const refreshToken = generateRefreshToken("student");

        // Set refresh token expiration date
        const refreshTokenExpiredIn = new Date();
        refreshTokenExpiredIn.setDate(refreshTokenExpiredIn.getDate() + 7); // Expires in 7 days

        // Get the current date and format it
        const createdAt = getFormattedDate();

        // SQL query to insert the student
        const registerQuery = `
            INSERT INTO student (username, password, student_name, refreshToken, refreshTokenExpiredIn, createdAt, role_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        console.log("Inserting user into the database...");
        const [result] = await db.query(registerQuery, [
            username,
            hashedPassword,
            studentName,
            refreshToken,
            refreshTokenExpiredIn,
            createdAt,
            2, // Role ID for student
        ]);

        // Get the last inserted ID
        const userId = result.insertId;

        console.log("User successfully registered with ID:", userId);

        // Respond with success message and user_id
        return res.status(201).json({
            message: "User registered successfully",
            userId: userId,
        });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

