const express = require("express");
const Route = express.Router();
const getSingelMateriController = require("../controller/getSingleMateriController");

Route.get("/api/Materi/:materi_id",getSingelMateriController.singleMateri)

module.exports = Route;