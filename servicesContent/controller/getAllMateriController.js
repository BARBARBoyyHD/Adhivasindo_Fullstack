const db = require("../db")

exports.getAllMateri = async (req,res)=>{
    try {

        const getAllMateriQuery = "SELECT * FROM materi"
        const [result] = await db.query(getAllMateriQuery)
        if(result.length === 0 ){
            return res.status(401).json({
                message:"All Materi Not found"
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