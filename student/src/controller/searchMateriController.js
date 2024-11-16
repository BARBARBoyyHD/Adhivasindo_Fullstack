const db = require("../../db");

exports.searchMateri = async (req, res) => {
  try {
    const { searchTerm } = req.query; // Get the search term from query parameters
    const searchQuery = `
      SELECT * FROM materi 
      WHERE title LIKE ?`;

    // Use the % symbols for partial matching
    const [result] = await db.query(searchQuery, [`%${searchTerm}%`]);

    if (result.length === 0) {
      return res.status(404).json({
        message: "No materi found matching the search term",
      });
    }

    res.status(200).json({
      message: "Materi found",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching materi:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
