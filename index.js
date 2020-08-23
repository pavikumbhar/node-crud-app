const express =require("express");
const app =express();
const bodyParser= require("body-parser");

app.use(bodyParser.json());

//database connection
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/userTestDB',{useNewUrlParser: true,useUnifiedTopology:true});
const db=mongoose.connection;

db.on("error",()=>{
    console.log("error enconterd while connecting to database");
});

db.once("open",()=>{
    console.log("Connected to database....!!!");
});

// Server 
app.listen(3000,()=>{
    console.log("Server is Running on port 3000");
});

//use routers
app.use("/users",require('./app/routers/userRouter'));
