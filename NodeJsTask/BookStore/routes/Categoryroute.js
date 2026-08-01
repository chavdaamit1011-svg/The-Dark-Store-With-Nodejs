const express = require("express")


const {addCat , getCat , updatecat} = require("../controller/CategoryController")
const C_route = express.Router()

C_route.post("/addcat", addCat)
C_route.get("/catget", getCat)
C_route.patch("/catupdate/:id", updatecat)


module.exports = C_route