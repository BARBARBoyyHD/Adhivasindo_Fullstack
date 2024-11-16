const express = require("express")
const Route = express.Router()
const deleteMateriController = require("../controller/deleteMateriController")

Route.delete("/api/DeleteMateri/:materi_id",deleteMateriController.deleteMateri)

module.exports = Route