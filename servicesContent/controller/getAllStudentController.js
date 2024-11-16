const db = require("../db")

exports.allStudent = async (req,res)=>{
    try {
        const getAllStudentQuery = "SELECT user_id,student_name,createdAt,role_id FROM student"
        const [result] = await db.query(getAllStudentQuery)
        if(result.length === 0 ){
            return res.status(401).json({
                message:"All Student Not found"
            })
        }
        else{
            return res.status(200).json(result)
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}