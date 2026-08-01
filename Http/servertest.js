const http = require('http')

http.createServer((request, response) => {

    // response.write("welocome my world")
    // response.end("")

    if (request.method("GET")) {
        response.write("home page")
    } else {
        response.write("not found")
    }


}).listen(5005)