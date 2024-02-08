const express = require("express");
const dotenv = require("dotenv");
const DbConnection = require("./databaseConnection.js");

const {users} = require("./data/users.json");
const {books} = require("./data/books.json");

const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

dotenv.config();

const app = express();

DbConnection();
const port = 8081;

app.use(express.json());

//http://localhost:8081/
app.get("/", (req,res)=>{
    res.status(200).json({
        message: "server is up and running..."
    })
})

app.use("/users", usersRouter); // http://localhost:8081/users
app.use("/books", booksRouter); // http://localhost:8081/books


app.get("*", (req,res)=>{
    res.status(404).json({
        message: "This route doesn't exist X("
    })
})

app.listen(port, ()=>{
    console.log(`Server is running at port:- ${port}`)
})