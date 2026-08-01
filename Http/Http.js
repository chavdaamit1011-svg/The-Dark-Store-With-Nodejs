const { write } = require('fs')
const Http = require('http')

Http.createServer((request, response) => {
    console.log(request.method);

    if (request.url === "/") {
        response.write("welcome to homepage")
    } else if (request.url === "/contact") {
        response.write("contact page")
    } else {
        response.write("not foundddd")
    }
    response.end()

}).listen(7899)

console.log("server running on http://localhost:7899");


