const fs = require("fs");
const a = 999;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("promise").then(console.log)

fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log(data);
})

setTimeout(() => console.log("setimeout"), 0)

process.nextTick(() => console.log("Process.nexttick"))

function printA() {
    console.log("a:" + a);
}
printA();
console.log("last line of program")

//output
// a:999
//Last line of program
//process.nexttick
//promise resolved
//settimeout
//setimmediate
//file data


//=================================================================================

// ##  Step 1: **Synchronous (Main Thread Execution)**

// When Node.js starts running the file, it executes **all top-level code** (synchronous code) first — before touching the event loop phases.

// So it executes:

// ```js
// const fs = require("fs");
// const a = 999;
// ```

// → Just declarations, nothing printed yet.

// Then we register all async tasks:

// * `setImmediate()` → scheduled for **check phase**
// * `Promise.then()` → scheduled for **microtask queue**
// * `fs.readFile()` → asynchronous file read (will complete later)
// * `setTimeout()` → scheduled for **timers phase**
// * `process.nextTick()` → scheduled for **nextTick queue**

// Then:

// ```js
// printA(); // prints immediately
// console.log("last line of program");
// ```

//  **So first outputs:**

// ```
// a:999
// last line of program
// ```

// ---

// ##  Step 2: **process.nextTick Queue**

// After all synchronous code finishes, Node.js checks the **nextTick queue** (this runs *before* the event loop continues).

// So:

// ```
// Process.nexttick
// ```

// is printed next.

// ---

// ##  Step 3: **Microtask Queue (Promises)**

// Then Node processes the **microtask queue**, which includes resolved Promises.

// So:

// ```
// promise
// ```

// is printed next.

// ---

// ##  Step 4: **Event Loop Starts**

// Now Node.js enters the **event loop**, which has these major phases:

// 1. **Timers** → runs callbacks from `setTimeout` / `setInterval`
// 2. **Pending Callbacks**
// 3. **Idle / Prepare**
// 4. **Poll** → I/O callbacks (like `fs.readFile`)
// 5. **Check** → runs `setImmediate`
// 6. **Close callbacks**

// ---

// ###  (a) Timers Phase:

// Your `setTimeout(..., 0)` is handled here.

//  Prints:

// ```
// setimeout
// ```

// ---

// ###  (b) Poll Phase:

// Here Node.js executes I/O callbacks like your `fs.readFile`.
// Once the file is read, its callback runs.

//  Prints file content:

// ```
// <file data>
// ```

// ---

// ###  (c) Check Phase:

// Finally, `setImmediate()` callbacks are run.

//  Prints:

// ```
// setImmediate
// ```

// ---

// ##  Final Output Order (Summary)

// | Step | Source          | Output               |
// | ---- | --------------- | -------------------- |
// | 1    | Synchronous     | a:999                |
// | 2    | Synchronous     | last line of program |
// | 3    | nextTick Queue  | Process.nexttick     |
// | 4    | Microtask Queue | promise              |
// | 5    | Timers Phase    | setimeout            |
// | 6    | Check Phase     | setImmediate         |
// | 7    | Poll Phase      | file data            |

// ---

// ###  **Final Output**

// ```
// a:999
// last line of program
// Process.nexttick
// promise
// setimeout
// setImmediate
// <file data>
// ```

// ---

// ###  Note:

// Sometimes `fs.readFile` (I/O callback) may appear **before or after** `setImmediate`, depending on how quickly the OS completes the I/O.
// But generally, **setImmediate runs before I/O callbacks** if both are queued in the same tick.

// So both orders are possible depending on system timing:

// ```
// ... setImmediate
// file data
// ```

// or

// ```
// ... file data
// setImmediate
// ```


