//using common js way

// const obj = require("./sum") // ./ means current directory 
// //or
// const { x, sum} = require ("./sum.js") // aavu pan chale destructuring
// let a = 10
// let b = 20
// // obj.sum(a,b)
// sum(a,b)

// // console.log(obj.x, obj.sum(a,b))
// console.log(x, sum(a,b))

//=================================
//using es6 way
import data from "./data.json" assert{ type: "json"}
import { x, sum}  from "./calculate/sum.js"
import { calculateMultiply } from  "./calculate/multiply.js"


let a = 10
let b = 20

calculateMultiply(a,b)
sum(a,b)

console.log(x, sum(a,b), calculateMultiply(a,b))
console.log(data)
console.log(data.name, data.age)

// In ES Modules, the word assert is part of import assertions.
// It tells Node.js extra information (metadata) about the file being imported — for example, what type of file it is.
// Without this assertion, Node.js doesn’t know what to do with .json (since by default, it only understands .js, .mjs, and .cjs).
// Causes:

// ERR_IMPORT_ASSERTION_TYPE_MISSING