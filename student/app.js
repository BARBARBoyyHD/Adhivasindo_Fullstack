require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express());
app.use(express.json());
app.use(cors());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  console.log("this is student");
  res.json("this is student");
});

// GET METHOD
app.get("/api/logout/student", require("./src/route/logoutRoute"));

// POST METHOD
app.post("/api/register/student", require("./src/route/registerRoute"));
app.post("/api/login/student", require("./src/route/loginRoutes"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
