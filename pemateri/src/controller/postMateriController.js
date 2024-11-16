const db = require("../../db");

const getFormattedDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${monthName}-${year}`;
};

exports.postMateri = async (req, res) => {
  try {
    const { title, description, pemateriId } = req.body; // Pemateri ID dikirim dari body
    const createdAt = getFormattedDate();

    // Validasi input
    if (!title || !description || !pemateriId) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    // Check if pemateri exists
    const findPemateriQuery = "SELECT * FROM pemateri WHERE pmteri_id = ?";
    const [pemateri] = await db.query(findPemateriQuery, [pemateriId]);
    if (!pemateri.length) {
      return res.status(404).json({ message: "Pemateri not found" });
    }

    const insertQuery =
      "INSERT INTO materi (title, description, pmteri_id, createdAt) VALUES (?, ?, ?, ?)";
    const values = [title, description, pemateriId, createdAt];

    const [result] = await db.query(insertQuery, values);

    // Berhasil
    return res
      .status(201)
      .json({
        message: "Materi created successfully",
        materiId: result.insertId,
      });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
