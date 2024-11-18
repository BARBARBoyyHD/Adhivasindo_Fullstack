const express = require("express");
const router = express.Router();
const logoutController = require("../controller/logoutController");

router.get("/api/logout/student", logoutController.logout);

module.exports = router;