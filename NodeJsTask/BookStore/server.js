const express = require("express")
const db = require("./config/db")
const bookroute = require("./routes/bookRouter")
const Productroute = require("./routes/ProductRoutes")
const C_route = require("./routes/Categoryroute")


const app = express()
app.use(express.json())
 
app.use("/book", bookroute)
app.use(Productroute)
app.use(C_route)


app.listen(5858,()=>{
    console.log("server chalu");
})