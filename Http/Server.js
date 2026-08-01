const express = require("express");

const app = express();

// app.set("View engine", "ejs");

app.use(express.urlencoded({ extended: true }))

let student = [
    {
        id: 1,
        name: "amit"
    },
    {
        id: 2,
        name: "rahul"
    }
]

app.get("/", (req, res) => {
    // res.render("home");
    res.render("index.ejs", { student })
});

app.post("/insertdata", (req, res) => {
    const { id, name } = req.body;
    let obj = {
        id,
        name
    }
    student.push(obj)
    return res.redirect("/")

})

app.post("/updatedata", (req, res) => {
    const { id, name } = req.body;
    let index = student.findIndex(ele => ele.id == id);
    if (index !== -1) {
        student[index].name = name;
    }
    console.log(id);
    return res.redirect("/");
});


app.post("/deletedata", (req, res) => {
    const { id } = req.body;
    student = student.filter(ele => ele.id != id);
    return res.redirect("/");
});

app.listen(3000);
