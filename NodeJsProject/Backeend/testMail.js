const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "chavdaamit1011@gmail.com",
        pass: "vfpjiewmavuxcwsw"
    }
});

const mailoption = {
    from: "chavdaamit1011@gmail.com",
    to: "chavdaamit1011@gmail.com",
    subject: "Test Mail",
    text: "This is a test mail."
};

console.log("Sending mail...");
transporter.sendMail(mailoption, (err, info) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Success:", info.response);
    }
});
