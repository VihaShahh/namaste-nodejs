import fs from "fs";

setImmediate(() => console.log("1st setImmediate"));

setTimeout(() => console.log("1st timer"), 0)

Promise.resolve("promise").then(console.log)

fs.readFile("./file.txt", "utf-8", (err, data) => {
    setTimeout(() => console.log("2nd timer"), 0)

    process.nextTick(() => console.log("2nd Process.nexttick"))

    setImmediate(() => console.log("2nd setImmediate"));

    console.log(data);
})


process.nextTick(() => console.log("1st Process.nexttick"))


console.log("last line of program")

setImmediate(() => console.log("1st setImmediate"));

setTimeout(() => console.log("1st timer"), 0)

Promise.resolve("promise").then(console.log)

fs.readFile("./file.txt", "utf-8", (err, data) => {
    setTimeout(() => console.log("2nd timer"), 0)

    process.nextTick(() => console.log("2nd Process.nexttick"))

    setImmediate(() => console.log("2nd setImmediate"));

    console.log(data);
})


process.nextTick(() => console.log("1st Process.nexttick"))


console.log("last line of program")

setImmediate(() => console.log("1st setImmediate"));

setTimeout(() => console.log("1st timer"), 0)

Promise.resolve("promise").then(console.log)

fs.readFile("./file.txt", "utf-8", (err, data) => {
    setTimeout(() => console.log("2nd timer"), 0)

    process.nextTick(() => console.log("2nd Process.nexttick"))

    setImmediate(() => console.log("2nd setImmediate"));

    console.log(data);
})


process.nextTick(() => console.log("1st Process.nexttick"))


console.log("last line of program")


//  Step 1: Top-Level (Synchronous) Execution

// Node executes all **top-level synchronous code first** — this is before the event loop begins.

// So immediately we have:

// ```js
// const fs = require("fs");
// ```

// and all async tasks are **registered**, not run yet.

// Synchronous line:

// ```js
// console.log("last line of program");
// ```

// runs right away.

// ---

// ###  Step 2: nextTick and Promise Microtasks

// After synchronous code finishes, Node processes the **microtask queue** in this order:

// 1. `process.nextTick()` callbacks
// 2. Promise `.then()` callbacks

// So:

// ```js
// process.nextTick(() => console.log("1st Process.nexttick"))
// Promise.resolve("promise").then(console.log)
// ```

// → These run **before** timers or I/O callbacks.

// ---

// ###  Step 3: Timers Phase

// Now Node enters the **Timers phase**, so:

// ```js
// setTimeout(() => console.log("1st timer"), 0)
// ```

// executes next.

// ---

// ###  Step 4: Poll Phase (fs.readFile)

// The file read operation (`fs.readFile`) finishes later (asynchronously), triggering its **I/O callback** to run in the **poll phase**.

// Inside that callback, three things are scheduled:

// ```js
// setTimeout(() => console.log("2nd timer"), 0)
// process.nextTick(() => console.log("2nd Process.nexttick"))
// setImmediate(() => console.log("2nd setImmediate"))
// console.log(data)
// ```

// Immediately inside that callback:

// * `console.log(data)` executes (synchronous).
// * After the callback finishes, Node checks the **microtask queue**, so:

//   * `2nd Process.nexttick` runs next.
// * Then it goes to the **check phase**, so `2nd setImmediate` executes.
// * On the next event loop tick, the **timers phase** comes again, and `2nd timer` runs.

// ---

// ###  Step 5: Full Expected Order (Assuming file exists)

// So the final output order will be:

// ```
// last line of program
// 1st Process.nexttick
// promise
// 1st timer
// <file content>
// 2nd Process.nexttick
// 2nd setImmediate
// 2nd timer
// 1st setImmediate
// ```

// ---

// ###  If `file.txt` is missing

// You’ll get:

// ```
// last line of program
// 1st Process.nexttick
// promise
// 1st timer
// [Error: ENOENT: no such file or directory, open './file.txt']
// 1st setImmediate
// ```

// (Because the I/O callback still runs — but with an error.)

// ---

// Would you like me to show **a detailed diagram** of the event loop phases and when each callback executes for this code?

//===================================================================
// What’s inside the `fs.readFile` callback

// ```js
// fs.readFile("./file.txt", "utf-8", (err, data) => {
//   setTimeout(() => console.log("2nd timer"), 0);
//   process.nextTick(() => console.log("2nd Process.nexttick"));
//   setImmediate(() => console.log("2nd setImmediate"));
//   console.log(data);
// });
// ```

// Now — all three (`setTimeout`, `setImmediate`, `process.nextTick`) are scheduled here.
// Let’s see how **Node’s event loop phases** decide which runs first 

// ---

// ##  Node.js Event Loop Phases (simplified order)

// After the **poll phase** (where `fs.readFile` callback runs), Node’s event loop continues like this:

// ```
// ┌──────────────────────────────┐
// │  1. timers (setTimeout)     │
// │  2. pending callbacks        │
// │  3. idle, prepare            │
// │  4. poll (I/O callbacks)    │ ← your fs.readFile() runs here
// │  5. check (setImmediate)     │
// │  6. close callbacks          │
// └──────────────────────────────┘
// ```

// So after the **poll phase**, Node **immediately proceeds to the check phase** —
// and **only after that**, it goes back to the **timers phase**.

// ---

// ##  Step-by-Step Breakdown

// 1. `fs.readFile` finishes reading and calls your callback
//    → Node enters the **poll phase**.

// 2. Inside callback:

//    * `setTimeout(..., 0)` schedules a task for the **next timers phase**.
//    * `setImmediate(...)` schedules a task for the **check phase**, which comes **right after poll**.
//    * `process.nextTick(...)` goes into the **microtask queue** (runs before leaving poll).

// 3. After the callback body ends:

//    * Node first runs all **microtasks** → so `2nd Process.nexttick` runs.
//    * Next, since the poll phase has ended, Node goes to the **check phase** → `2nd setImmediate` runs.
//    * Only on the **next event loop iteration** does it reach the **timers phase** → `2nd timer` runs.

//  Therefore:

// ```
// 2nd Process.nexttick   ← microtask
// 2nd setImmediate       ← check phase
// 2nd timer              ← next loop’s timers phase
// ```

// ---

// ##  Visual Summary

// | Phase              | Task Executed          | Explanation                      |
// | ------------------ | ---------------------- | -------------------------------- |
// | Poll               | `fs.readFile` callback | File reading done, callback runs |
// | Microtasks         | `2nd Process.nexttick` | Runs right after poll callback   |
// | Check              | `2nd setImmediate`     | Runs right after poll phase      |
// | Next loop → Timers | `2nd timer`            | Runs in next event loop cycle    |

// ---

// ###  Key Rule to Remember:

// >  **If `setTimeout()` and `setImmediate()` are both called inside an I/O callback**,
// > → `setImmediate()` will **always run before** `setTimeout()`.

// (because of the event loop phase order: poll → check → timers)

// ---


