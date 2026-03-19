const express = require("express")
const db = require("./config/db")
const bookroute = require("./routes/bookRouter")


const app = express()
app.use(express.json())
 
app.use("/book", bookroute)


app.listen(5858,()=>{
    console.log("server chalu");
})