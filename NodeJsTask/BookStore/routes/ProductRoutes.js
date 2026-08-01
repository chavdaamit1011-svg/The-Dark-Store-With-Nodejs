const express = require("express")


const {addproduct,getproduct , updateproduct} = require("../controller/ProductController")
const Productroute = express.Router()

Productroute.post("/productadd", addproduct)
Productroute.get("/productget", getproduct)
Productroute.patch("/productupdate/:id", updateproduct)


module.exports = Productroute