const CategoryModel = require("../model/CategoryModel")

const addCat = async (req,res)=>{

    const data = await CategoryModel.create(req.body)
    res.send(data)

}

const getCat = async (req,res)=>{

    const data = await CategoryModel.find({}).populate("ProductId")
    res.send(data)

}

const updatecat = async (req,res)=>{
    const id = req.params.id

    // pehla data laav
    let category = await CategoryModel.findById(id)

    // pachhi product add kar
    category.ProductId.push(req.body.ProductId)

    // save kar
    await category.save()

    res.send(category)
}

module.exports={addCat,getCat,updatecat}

