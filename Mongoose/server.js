const express = require("express")
const db = require("./config/db")
const usermodel = require("./model/usermodel")
const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())




app.post("/add", upload, async (req, res) => {
   

    const data = await usermodel.create(req.body)
    res.send(data)

})



app.get("/",async(req,res)=>{
    const data=await usermodel.find(req.body)
    res.send(data)

})

app.delete("/:id",async(req,res)=>{
    const data = await usermodel.findByIdAndDelete(req.params.id)
    res.send("sucsess")
})

app.patch("/:id",async(req,res)=>{

    const id = req.params.id
    const data = await usermodel.findByIdAndUpdate(id,req.body)
    res.send(data)
})

app.listen(5111, () => {
    console.log("server chalu");

})