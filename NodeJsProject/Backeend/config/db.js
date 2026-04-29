const mongoose = require("mongoose")

const mongoURI = process.env.MONGO_URI || "mongodb+srv://chavdaamit1011_db_user:77K2vCFrZaMt6tVF@cluster0.1r1p4xa.mongodb.net/DarkStore";
mongoose.connect(mongoURI)

const db = mongoose.connection

db.on("connected",()=>{
    console.log("MongoDb Connected💀");
})

module.exports = db