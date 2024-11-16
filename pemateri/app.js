require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

const port = process.env.PORT

app.use(express())
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.json("this is pemateri")
})

//GET METHOD
app.get("/api/logout/pemateri",require("./src/route/logoutRoute"))
// POST METHOD
app.post("/api/register/pemateri",require("./src/route/registerRoute"))
app.post("/api/login/pemateri",require("./src/route/loginRoute"))
app.post("/api/PostMateri",require("./src/route/postMateriRoute"))

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
