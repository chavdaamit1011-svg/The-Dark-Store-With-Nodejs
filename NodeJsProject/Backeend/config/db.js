const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/DarkStore")

const db = mongoose.connection

db.on("connected",()=>{
    console.log("MongoDb Connected💀");
})

module.exports = db