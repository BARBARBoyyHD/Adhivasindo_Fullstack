const express = require("express")
const route = express.Router()
const loginController = require("../controller/loginController")

route.post("/api/login/student",loginController.login)

module.exports = route