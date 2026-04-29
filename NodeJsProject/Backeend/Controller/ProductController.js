const productmodel = require("../Model/ProductModel")
const prodcutModel = require("../Model/ProductModel")
const product = require("../ProductsData/Products")

const Getcategory = async (req, res) => {

    const category = req.params.cat

    let data

    if (category === "all") {
        data =await productmodel.find()
    }
    else {
        data =await productmodel.find({ 
             category: req.params.cat
         })
    }

    res.send(data)

}

const getsubcategory = async (req, res) => {
    try {
        const { category } = req.body;
        const subcategory = req.params.sub;

        let data;
        if (subcategory === "all") {
            data = await productmodel.find({ category });
        } else {
            data = await productmodel.find({ category, subcategory });
        }

        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};


const getSingleProduct = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.id);
        if (!product) return res.status(404).send("Not found");
        res.send(product);
    } catch (e) {
        console.error(e);
        res.status(500).send("Error fetching single product");
    }
}

module.exports = { Getcategory, getsubcategory, getSingleProduct }