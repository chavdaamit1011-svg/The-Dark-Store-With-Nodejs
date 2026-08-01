const bookmodel = require("../model/bookModel")


const addbook = async (req, res) => {
    const data = await bookmodel.create(req.body)
    res.send(data)

}

const getbook = async (req, res) => {
    const data = await bookmodel.find()
    res.send(data)

}

const updatebook = async (req, res) => {
    const data = await bookmodel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.send(data)

}

const deletebook = async (req, res) => {

    const data = await bookmodel.findByIdAndDelete(req.params.id)
    res.send(data)
}

module.exports = { addbook, getbook, updatebook, deletebook }