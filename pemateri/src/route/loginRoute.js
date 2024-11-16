const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

router.post("/api/login/pemateri", loginController.login);

module.exports = router;