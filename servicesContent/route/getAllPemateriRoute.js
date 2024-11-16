const express = require("express");
const Route = express.Router();
const getAllPemateriController = require("../controller/getAllPemateriController");

Route.get("/api/allPemateri",getAllPemateriController.allPemateri)

module.exports = Route