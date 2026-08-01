const Productsmodel = require("../model/ProductModel")

const addproduct = (async (req,res)=>{
    const data = await Productsmodel.create(req.body)
    res.send(data)
})

const getproduct = async (req,res)=>{

    const data = await Productsmodel.find({})
    res.send(data)

}

const updateproduct = async (req,res)=>{

    const id = req.params.id
    const data = await Productsmodel.findByIdAndUpdate(id , req.body)
    res.send (data)

}
module.exports = {addproduct, getproduct , updateproduct}