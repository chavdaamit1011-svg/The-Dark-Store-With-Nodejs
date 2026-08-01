const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/add")

const db = mongoose.connection

db.on("connected",()=>{
    console.log("connected");
})



