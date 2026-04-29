const mongoose = require("mongoose")

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/DarkStore";
mongoose.connect(mongoURI)

const db = mongoose.connection

db.on("connected",()=>{
    console.log("MongoDb Connected💀");
})

module.exports = db