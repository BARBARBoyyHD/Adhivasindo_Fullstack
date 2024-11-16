const db = require("../../db"); // Correct the module import

exports.updateMateri = async (req, res) => {
  try {
    const { materi_id } = req.params; // Extract materi_id from the URL parameters
    const { title, description, content } = req.body; // Assuming these fields exist in the body

    if (!title || !description ) {
      return res.status(400).json({
        message: "All fields (title, description, content) are required",
      });
    }

    const updateMateriQuery = `
      UPDATE materi 
      SET title = ?, description = ?, content = ? 
      WHERE materi_id = ?`;

    const [result] = await db.query(updateMateriQuery, [title, description, content, materi_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Materi Not Found",
      });
    }

    res.status(200).json({
      message: "Materi updated successfully",
    });
  } catch (error) {
    console.error("Error updating materi:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
