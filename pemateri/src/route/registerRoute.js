const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");

router.post("/api/register/pemateri", registerController.register);

module.exports = router;