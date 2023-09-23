const express = require("express")

const dbConnect = require("./DbConnect/dbConnect")
const bodyParser = require("body-parser")
const multer = require("multer")
const path = require("path")


dbConnect()

const app = express()

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use("/ems", require('./Route/route') )


// const upload = multer({
//   storage : storage
// })

// app.post("/login", require('./Route/route') )

// app.put("/:id",require('./Route/route'))

// app.delete("/:id",require('./Route/route'))

app.listen("4000",()=>console.log("server is start"))