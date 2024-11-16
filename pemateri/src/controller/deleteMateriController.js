const db = require("../../db");

exports.deleteMateri = async (req, res) => {
  try {
    const { materi_id } = req.params; // Get the materi_id from request parameters

    // Check if materi exists before attempting to delete
    const checkQuery = "SELECT * FROM materi WHERE materi_id = ?";
    const [checkResult] = await db.query(checkQuery, [materi_id]);

    if (checkResult.length === 0) {
      return res.status(404).json({
        message: "Materi Not Found",
      });
    }

    // Proceed with the delete operation
    const deleteQuery = "DELETE FROM materi WHERE materi_id = ?";
    const [result] = await db.query(deleteQuery, [materi_id]);

    // Check if the deletion was successful (affectedRows will be greater than 0)
    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Failed to delete materi",
      });
    }

    // Respond with success message
    res.status(200).json({
      message: "Materi deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting materi:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
