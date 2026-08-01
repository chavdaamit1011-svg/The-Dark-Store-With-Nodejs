const express = require("express")
const db = require("./config/db")
const u_Router = require("./routes/userRouter")

const app = express()
app.use(express.json())
    
app.use("/user", u_Router)

app.listen(5001, () => {
    console.log("server chalu");
})

