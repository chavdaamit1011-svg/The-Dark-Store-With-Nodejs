const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
})

const usermodel = new mongoose.model("user",user)

module.exports=usermodel