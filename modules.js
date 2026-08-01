// 3 types of modules 
//core module , local module , third party module 

//local module = ek module ko dusre module me use karna import export
//third party module = router redux etc

//syncrones module
// const { AsyncResource } = require("async_hooks");
// const filesystem = require("fs")  // require("fs") = bulit in core module

// filesystem.writeFileSync("hello.txt","hello") // writefilesync = file cretare karva

// filesystem.appendFileSync("hello.txt","welcome to my world") // appendfilesync = text add karva

// const read = filesystem.readFileSync("hello.txt") // readfilesync = print karva 
// console.log(read.toString());

// filesystem.renameSync("hello.txt","file.txt") // renamesync = file name change karva

// filesystem.unlinkSync("file.txt") // file delet karva


// local module
const hello = ()=>{
    console.log("welcome to my world");
}
const FLO = ()=>{
    console.log("welcome to my world HJFUYGFJHV");
}

module.exports = {hello,FLO} // module.export = file.js ma hello function import karava mate



// // AsyncResource module
// filesystem.readFile("file.txt", "utf-8", (err, data) => {
//     console.log("show data", data); // Shows content of 'abc.txt'
// });



//   Asynchronous Operations:
//   - Run in the background
//   - Program does not wait, it continues
// */


// Write file asynchronously
// fs.writeFile("Asynchronous.txt", "this is Asynchronous", () => {
//     console.log("Asynchronous data"); // This runs after file is written
// });
// console.log("end"); // Runs immediately, before the file is finished writing

// // Another async write
// fs.writeFile("abc.txt", "this is node", () => {
//     console.log("success"); // Runs when file is created
// });

// //  Read file asynchronously
// fs.readFile("abc.txt", "utf-8", (err, data) => {
//     console.log("show data", data); // Shows content of 'abc.txt'
// });
