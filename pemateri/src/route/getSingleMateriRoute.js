const express = require("express")
const Route = express.Router()
const getSingleMateri = require("../controller/getSingelMateriController")

Route.get("/api/Materi/:materi_id",getSingleMateri.SingleMateri)

module.exports = Route