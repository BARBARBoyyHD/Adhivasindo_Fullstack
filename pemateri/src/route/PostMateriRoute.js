const express = require("express");
const router = express.Router();
const postMateriController = require("../controller/postMateriController");

router.post("/api/PostMateri", postMateriController.postMateri);

module.exports = router;