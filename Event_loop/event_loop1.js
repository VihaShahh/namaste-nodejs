import fs from "fs";

const a = 999;

// Schedule asynchronous tasks
setImmediate(() => console.log("setImmediate"));

fs.readFile("./file.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log(data);
});

setTimeout(() => console.log("set timeout"), 0);

// Synchronous part
const printA = () => {
  console.log(`a=${a}`);
};

printA();
console.log("Last line of program");


// ###  Step-by-Step Execution

// #### **1. Top-level (synchronous) execution**

// Node executes everything top to bottom synchronously first.

//  These run immediately:

// ```js
// const fs = require("fs");
// const a = 999;
// ```

//  These **schedule asynchronous tasks**:

// ```js
// setImmediate(...)   // goes to "check" phase
// fs.readFile(...)     // goes to I/O phase (async)
// setTimeout(..., 0)   // goes to "timers" phase
// ```

//  Function definition only (no execution yet):

// ```js
// function printA() { ... }
// ```

//  These two **run synchronously**:

// ```js
// printA();                  // prints "a=999"
// console.log("Last line of program");  // prints "Last line of program"
// ```

// So far, output is:

// ```
// a=999
// Last line of program
// ```

// ---

// ### **2. Event Loop Phases**

// After synchronous code finishes, Node.js enters its event loop.

// Let’s look at what’s queued up:

// | Task Type              | Phase                     | What it will print   |
// | ---------------------- | ------------------------- | -------------------- |
// | `setTimeout(..., 0)`   | Timers phase              | set timeout          |
// | `fs.readFile` callback | Poll phase (I/O complete) | prints file contents |
// | `setImmediate()`       | Check phase               | setImmediate         |

// ---

// ### **3. Actual Execution Order**

// Now, here’s how Node’s event loop will proceed:

// 1. **Timers Phase:** Executes `setTimeout(..., 0)`
//    → prints **`set timeout`**

// 2. **Poll Phase:** Waits for I/O like `fs.readFile` to complete.
//    Once file reading finishes, its callback runs:
//    → prints **`<contents of file.txt>`**

// 3. **Check Phase:** Executes `setImmediate(...)`
//    → prints **`setImmediate`**

// ---

// ###  **Final Output Order (most likely):**

// ```
// a=999
// Last line of program
// set timeout
// <contents of file.txt>
// setImmediate
// ```

// ---

// ###  Note:

// * `setTimeout(..., 0)` runs **before** `setImmediate()` in most cases (especially when called from the main module), because timers are checked earlier in the event loop.
// * However, if the I/O operation (`fs.readFile`) takes longer and moves phases differently, sometimes `setImmediate` might appear before the file read output — but **this is rare** in this specific case.

