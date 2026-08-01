const usermodel = require("../useModel/userModel")

const addUser  = async (req,res)=>{

    const data = await usermodel.create(req.body)
    return res.send(data)
}

module.exports = addUser