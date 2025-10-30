// Node.js Event Loop Phases Overview

// The Node.js event loop has **6 main phases** (as implemented in `libuv`):

// ```
// ┌────────────────────────────┐
// │ 1. timers (setTimeout)     │
// │ 2. pending callbacks        │
// │ 3. idle, prepare (internal) │
// │ 4. poll (I/O callbacks)     │
// │ 5. check (setImmediate)     │
// │ 6. close callbacks          │
// └────────────────────────────┘
// ```

// Plus — there are **microtasks** that run *between* these phases:

// * `process.nextTick()`
// * `Promise.then()` / `queueMicrotask()`

// ---

// ##  Phase-by-Phase Breakdown

// ### ** Timers Phase**

//  **What runs here:**

// * All callbacks from `setTimeout()` and `setInterval()` **whose time has expired.**

//  **Examples:**

// ```js
// setTimeout(() => console.log("Timer done!"), 0);
// setInterval(() => console.log("Interval tick!"), 1000);
// ```

//  **When:** Runs first in every loop iteration **if** any timers are ready.

// ---

// ### ** Pending Callbacks Phase**

//  **What runs here:**

// * Some system-level callbacks from the OS — like certain TCP errors, or when a DNS lookup fails.

//  **You rarely use this directly in JavaScript.**
// Example:

// ```js
// // internal things like TCP 'ECONNREFUSED' errors
// ```

// ---

// ### ** Idle / Prepare Phase**

//  **What runs here:**

// * Node.js internal tasks only — you can ignore this phase for app logic.

// ---

// ### ** Poll Phase (I/O Callbacks)**

//  **What runs here:**

// * **Most I/O callbacks**: file reads/writes, network requests, database queries, etc.
// * Example: `fs.readFile`, `http.get`, `net`, or any callback that waits for data from OS or another system.

//  **Examples:**

// ```js
// fs.readFile("file.txt", "utf-8", (err, data) => {
//   console.log("File data ready!");
// });

// http.get("http://example.com", res => {
//   console.log("Response received!");
// });
// ```

//  **When:**

// * After timers.
// * It processes all completed I/O callbacks.
// * If no I/O is waiting, it will **pause** (block) for new events until something happens.

// ---

// ### ** Check Phase (setImmediate)**

//  **What runs here:**

// * All callbacks registered by `setImmediate()`.

//  **Examples:**

// ```js
// setImmediate(() => console.log("Immediate callback!"));
// ```

//  **Key rule:**
// If you call both `setTimeout(..., 0)` and `setImmediate()`:

// * If they’re in top-level code → `setTimeout` **usually runs first** (but not guaranteed).
// * If inside an **I/O callback** → `setImmediate` **always runs first**.

// ---

// ### ** Close Callbacks Phase**

//  **What runs here:**

// * Close event callbacks, e.g., when a socket or stream is closed.

//  **Examples:**

// ```js
// socket.on('close', () => console.log('Socket closed!'));
// server.on('close', () => console.log('Server shut down!'));
// ```

// ---

// ##  Bonus: Microtasks Queue (Highest Priority)

//  **What runs here:**

// * `process.nextTick()`
// * `Promise.then()`, `queueMicrotask()`

//  **Examples:**

// ```js
// process.nextTick(() => console.log("nextTick"));
// Promise.resolve().then(() => console.log("promise"));
// ```

//  **When:**

// * Always runs **immediately after the current operation** (before the event loop moves to the next phase).
// * So microtasks run between every phase.

// ---

// ##  Summary Table

// | Phase                 | Example Functions                         | Priority / When It Runs             |
// | --------------------- | ----------------------------------------- | ----------------------------------- |
// | **Microtasks**        | `process.nextTick()`, `Promise.then()`    | 🥇 Runs **after each phase**        |
// | **Timers**            | `setTimeout()`, `setInterval()`           | Executes timers whose delay expired |
// | **Pending Callbacks** | System-level (e.g. TCP errors)            | Rarely used manually                |
// | **Poll (I/O)**        | `fs.readFile()`, `http.get()`, DB queries | Runs when I/O completes             |
// | **Check**             | `setImmediate()`                          | After poll phase                    |
// | **Close Callbacks**   | `socket.on('close')`                      | When handles close                  |

// ---

// ##  Quick Mnemonic

//  **“Timers → Poll → Check”** are the 3 most important to remember.

// ### Real sequence for your example:

// ```js
// fs.readFile(..., () => {
//   setTimeout(...);
//   setImmediate(...);
// })
// ```

// ➡ Inside an I/O callback:

// ```
// Poll phase (fs.readFile callback)
// ↓
// Microtasks (process.nextTick)
// ↓
// Check phase (setImmediate)
// ↓
// Next loop → Timers phase (setTimeout)
// ```


