const express = require("express");
const Route = express.Router();
const getAllStudentController = require("../controller/getAllStudentController");

Route.get("/api/allStudent",getAllStudentController.allStudent)

module.exports = Route;
