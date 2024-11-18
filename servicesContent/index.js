    require("dotenv").config()
    const express =require("express")
    const app = express()
    const cors = require("cors")
    const cookieParser = require("cookie-parser")
    const proxy = require("express-http-proxy")
    const port = process.env.PORT
    const authUser = require("./middleware/authUser")

    app.use(express())
    app.use(express.json())
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true // This allows cookies to be sent
    }));
    app.use(cookieParser())
    app.set("trust proxy", true);
    // GET METHOD /8000
    app.get("/api/auth/user", authUser , (req, res) => {
        // Assuming you have user information available in the request object
        res.json({message:"success"});
    });
    app.get("/", (req, res) => {
        res.json("this is servicesContent")
    })
    app.get("/api/allStudent",require("./route/getAllStudentRoute"))
    app.get("/api/allPemateri",require("./route/getAllPemateriRoute"))
    app.get("/api/Materi/:materi_id",require("./route/getSingleMateriRoute"))
    app.get("/api/allMateri",authUser,require("./route/getAllMateriRoute"))
    // GET METHOD STUDENT

    // GET METHOD PEMATERI
    app.get("/api/logout/pemateri",proxy("http://localhost:8002/api/logout/pemateri"))

    // POST METHOD pemateri
    app.post("/api/login/pemateri",proxy("http://localhost:8002/api/login/pemateri"))
    app.post("/api/register/pemateri",proxy("http://localhost:8002/api/register/pemateri"))
    app.post("/api/PostMateri",proxy("http://localhost:8002/api/PostMateri"))

    // DELETE METHOD pemateri
    app.delete("/api/DeleteMateri/:materi_id",proxy("http://localhost:8002/api/DeleteMateri/:materi_id"))

    // PUT METHOD pemateri
    app.put("/api/UpdateMateri/:materi_id",proxy("http://localhost:8002/api/UpdateMateri/:materi_id"))

    // GET METHOD student
    app.get("/api/logout/student",proxy("http://localhost:8001/api/logout/student"))
    app.get("/api/searchMateri",proxy("http://localhost:8001/api/searchMateri"))

    // POST METHOD student
    app.post("/api/login/student",proxy("http://localhost:8001/api/login/student"))
    app.post("/api/register/student",proxy("http://localhost:8001/api/register/student"))


    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    })  