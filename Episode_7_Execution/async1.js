const fs = require("fs");
const https = require("https");

console.log("Asynchronous Javascript");

var a = 5;
var b = 10;

// (1) Synchronous file read
fs.readFileSync("./file.txt", "utf8");
console.log("This will execute only after reading the file");

// (2) Async HTTP request
https.get("https://dummyjson.com/products/1", (res) => {
  console.log("data fetch successfully");
});

// (3) Async setTimeout
setTimeout(() => {
  console.log("Execute it after 5 seconds");
}, 5000);

// (4) Async file read
fs.readFile("./file.txt", "utf-8", (err, data) => {
  console.log("file data:" + data);
});

// (5) Another synchronous read
fs.readFileSync("./file.txt", "utf8");
console.log("This will execute only after reading the file");

// (6) Synchronous multiply function
function multiply(x, y) {
  const result = x * y;
  return result;
}

const c = multiply(a, b);
console.log("Multiplication ans is:" + c);


 //Start understanding the flow

// ```
// Asynchronous Javascript
// ```

// ####  Step 2 — First `fs.readFileSync`

// * The file is **read synchronously**, blocking the thread.
// * After it completes:

// ```
// This will execute only after reading the file
// ```

// ####  Step 3 — `https.get`

// * Starts **async** HTTP request.
// * Callback will run later once data is fetched.
// * No output yet.

// ####  Step 4 — `setTimeout(..., 5000)`

// * Timer starts (async).
// * Will print after 5 seconds.

// ####  Step 5 — `fs.readFile` (async)

// * Starts reading the file asynchronously in the background.
// * Its callback will run later (before or after HTTP depending on timing).

// ####  Step 6 — Second `fs.readFileSync`

// * Another **blocking** read.
// * Nothing runs during this.
// * After completion:

// ```
// This will execute only after reading the file
// ```

// ####  Step 7 — Multiply function

// * Runs synchronously.

// ```
// Multiplication ans is:50
// ```

// ---

// ###  Step 8 — Event Loop (Async callbacks run now)

// Once all sync code above is done:

// * Async file read finishes:

//   ```
//   file data:<content of file.txt>
//   ```
// * HTTP request finishes (depends on network):

//   ```
//   data fetch successfully
//   ```
// * After 5 seconds total:

//   ```
//   Execute it after 5 seconds
//   ```

// ---

// ###  **Final Output Order (most likely)**

// ```
// Asynchronous Javascript
// This will execute only after reading the file
// This will execute only after reading the file
// Multiplication ans is:50
// file data:<content of file.txt>
// data fetch successfully
// Execute it after 5 seconds
// ```

