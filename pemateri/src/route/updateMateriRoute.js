const express = require("express")
const Route = express.Router()
const updateMateriController = require("../controller/updateMateriController")

Route.put("/api/UpdateMateri/:materi_id",updateMateriController.updateMateri)

module.exports = Route