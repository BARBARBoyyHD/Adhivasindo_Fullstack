const express = require("express")
const Route = express.Router()
const searchMateriController = require("../controller/searchMateriController")

Route.get("/api/searchMateri",searchMateriController.searchMateri)

module.exports = Route