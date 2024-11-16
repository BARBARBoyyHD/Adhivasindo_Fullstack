const {createPool} = require("mysql2/promise")

const db = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"adhivasindo_database" 
})

module.exports = db