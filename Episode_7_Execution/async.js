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

// (5) Synchronous function
function multiply(x, y) {
  const result = x * y;
  return result;
}

const c = multiply(a, b);
console.log("Multiplication ans is:" + c);
// Execution Flow (step-by-step)

// #### **Step 1: Synchronous lines execute first**

// 1. `console.log("Asynchronous Javascript")`
//    → prints:

//    ```
//    Asynchronous Javascript
//    ```

// 2. `fs.readFileSync("./file.txt", "utf8");`

//    * This **blocks** the thread until the file is read.
//    * (It doesn’t print anything since no `console.log(data)` is used.)

// 3. Then:

//    ```
//    This will execute only after reading the file
//    ```

// 4. `https.get(...)`

//    * Starts the HTTP request (non-blocking).
//    * The callback (`console.log("data fetch successfully")`) will run **later** when response arrives.

// 5. `setTimeout(...)`

//    * Timer starts (non-blocking).
//    * Will print after ~5 seconds.

// 6. `fs.readFile(...)`

//    * Starts asynchronous file reading (non-blocking).
//    * Its callback will run later.

// 7. Function `multiply` defined and called:

//    ```
//    Multiplication ans is:50
//    ```

// ---

// ###  Event Loop Phase — Asynchronous callbacks run

// After the main thread is free (all synchronous code done):

// * **When file read completes (fs.readFile):**

//   ```
//   file data:<content of file.txt>
//   ```

// * **When HTTP request completes:**

//   ```
//   data fetch successfully
//   ```

// * **After 5 seconds (setTimeout):**

//   ```
//   Execute it after 5 seconds
//   ```

// ---

// ###  **Final Output Order (most likely):**

// ```
// Asynchronous Javascript
// This will execute only after reading the file
// Multiplication ans is:50
// file data:<content of file.txt>
// data fetch successfully
// Execute it after 5 seconds
// ```

// *(Note: The order of the last two — file data vs data fetch — can swap depending on which finishes first.)*

// ---

// ### Summary

// | Type         | Function       | Blocks Main Thread? | Output Timing             |
// | ------------ | -------------- | ------------------- | ------------------------- |
// | Synchronous  | `readFileSync` |  Yes               | Immediately               |
// | Asynchronous | `https.get`    |  No                | Later (network delay)     |
// | Asynchronous | `setTimeout`   |  No                | After 5s                  |
// | Asynchronous | `fs.readFile`  |  No                | After file read completes |
// | Synchronous  | `multiply`     |  Yes               | Immediately               |

