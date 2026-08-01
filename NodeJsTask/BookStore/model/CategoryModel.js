const mongoose = require("mongoose")

const CategoryData = mongoose.Schema({

    title: {
        type: String
    },
    qnty: {
        type: Number
    },
    ProductId:[
        {
        type:mongoose.Schema.Types.ObjectId,ref:"Products"
    }
    ]

})

const CategoryModel = mongoose.model("Category", CategoryData)

module.exports = CategoryModel