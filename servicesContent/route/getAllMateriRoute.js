const express = require("express")
const Route = express.Router()
const getAllMateriController = require("../controller/getAllMateriController")


Route.get("/api/allMateri",getAllMateriController.getAllMateri)

module.exports = Route