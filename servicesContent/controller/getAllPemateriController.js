const db = require("../db")

exports.allPemateri = async (req,res) =>{
    try {
        
        const getAllPemateri = "SELECT pmteri_name,role_id FROM pemateri"
        const [result] = await db.query(getAllPemateri)

        if(result.length === 0){
            return res.status(401).json({
                message:"All Pemateri Not found"
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