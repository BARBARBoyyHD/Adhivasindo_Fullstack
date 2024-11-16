const express = require("express")
const route = express.Router()
const registerStudent = require("../controller/registerController")

route.post("/api/register/student",registerStudent.register)

module.exports = route