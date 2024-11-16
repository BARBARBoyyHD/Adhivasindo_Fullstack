require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../../db");
const bcrypt = require("bcrypt");

const generateAccessToken = (userRole) => {
    return jwt.sign({ userRole }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
};
const generateRefreshToken = (userRole) => {
    return jwt.sign({ userRole }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

exports.login = async (req,res)=>{
    try {
        const {username,password} = req.body;
        const checkUserRole = "SELECT * FROM pemateri WHERE username = ? and role_id = 3"
        const [checkRole] = await db.query(checkUserRole,[username])

        if(!username || !password){
            return res.status(400).json({
                message:"Please fill all the fields"
            })
        }
        if(checkRole.length === 0){
            return res.status(401).json({
                message:"You are not pemateri please register for pemateri first"
            })
        }

        const findUsernameQuery = "SELECT * FROM pemateri WHERE username = ?";
        const [usernameResult] = await db.query(findUsernameQuery, [username]);

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
                secure:true, // Secure only in production
                maxAge: 30 * 60 * 1000, // 30 minutes
            })
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure:true, // Secure only in production
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .cookie("role_id", user.role_id, {
                httpOnly: true,
                sameSite: "strict",
                secure:true, // Secure only in production
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            })
            .json({
                message: "Login successful",
                role_id: user.role_id,
            });
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}