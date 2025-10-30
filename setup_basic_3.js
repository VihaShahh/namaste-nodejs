let a =12
console.log(a)

console.log(this) // {} // in browerser its window object
//console.log(global) // global object
console.log(globalThis == global) // true
//Because globalThis is a universal name for the global object introduced in ES2020.

// In Node.js → globalThis === global

// In Browser → globalThis === window


console.log(globalThis == this) // false
// Because in Node.js:

// this (in the top-level module) is not global, it’s {} (a module-scoped object)

// globalThis (or global) is the actual global object