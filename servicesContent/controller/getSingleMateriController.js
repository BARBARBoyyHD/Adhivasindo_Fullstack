const db = require("../db")

exports.singleMateri = async (req, res) => {
    try {
        const { materi_id } = req.params;

        const getSingleMateriQuery = "SELECT * FROM materi WHERE materi_id = ?";
        const [result] = await db.query(getSingleMateriQuery, [materi_id]);

        if (result.length === 0) {
            return res.status(404).json({
                message: "Materi Not Found",
            });
        }else{
            return res.status(200).json(result)
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}