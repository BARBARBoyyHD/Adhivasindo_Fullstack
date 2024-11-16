const db = require("../../db");

exports.SingleMateri = async (req, res) => {
  try {
    const { materi_id } = req.params;
    const singleMateriQuery = "SELECT * FROM materi WHERE materi_id = ?";
    const [result] = await db.query(singleMateriQuery, [materi_id]);
    console.log("query result",result);
    if (result.length === 0) {
      return res.status(404).json({
        message: "Materi Not Found",
      });
    }
    else{
        // Return the single materi data
    res.status(200).json({
        message: "Materi fetched successfully",
        data: result[0], // Assuming only one record for the given materi_id
      });
    }

    
  } catch (error) {
    console.error("Error fetching materi:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
