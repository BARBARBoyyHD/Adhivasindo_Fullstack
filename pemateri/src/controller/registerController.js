const db = require("../../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const generateRefreshToken = (userRole) => {
    return jwt.sign({ userRole }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

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
        
        const { username, password, pemateriName } = req.body;
        const createdAt = getFormattedDate()
        if(!username || !password || !pemateriName){
            return res.status(400).json({
                message:"Please fill all the fields"
            })
        }

        if(username.length < 6){
            return res.status(400).json({
                message:"Username must be at least 6 characters"
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                message:"Password must be at least 8 characters"
            })
        }

        const refreshToken = generateRefreshToken("pemateri")
        const refreshTokenExpiredIn = new Date();
        refreshTokenExpiredIn.setDate(refreshTokenExpiredIn.getDate() + 7);
        const hashedPassword = await bcrypt.hash(password, 10)
        const findSameUsername = "SELECT * FROM pemateri WHERE username = ?"

        const [sameUsername] = await db.query(findSameUsername,[username])
        if(sameUsername.length > 0){
            return res.status(400).json({
                message:"Username already exists"
            })
        }

        const registerQuery = "INSERT INTO pemateri (username,password,pmteri_name,refreshToken,refreshTokenExpiredIn,createdAt) VALUES (?,?,?,?,?,?)"
        const [result] = await db.query(registerQuery,[username,hashedPassword,pemateriName,refreshToken,refreshTokenExpiredIn,createdAt])

        return res.status(201).json({
            message:"Pemateri registered successfully"
        })



    } catch (error) {
        console.error("Error",error)
        return res.status(500).json({
            message:"Internal Server Erorr"
        })
        
    }
}

