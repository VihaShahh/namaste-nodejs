import fs from "fs";

setImmediate(() => console.log("setimmediate"));
setTimeout(() => console.log("settimeout"));
Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log(data);
})

process.nextTick(() => {
    process.nextTick(() => console.log("inner nexttick"));
    console.log("process.nexttick")
})

console.log("last line of program");

//=================================================================================

// setImmediate() always runs in check phase

// fs.readFile() callback runs in poll phase

// But depending on how quickly the OS completes the read, Node might:

// already have data ready in the same tick (so poll → check), or

// move to check phase before data arrives (so check → next poll)

// This is timing-dependent and system-dependent (file size, CPU, OS scheduling).

//=========================================================================================
// Step-by-Step Event Loop Phases

// ### ** Synchronous Phase**

// Executed immediately (main thread):

//  Prints:

// ```
// a:999
// last line of program
// ```

// Then registers:

// * a timer (`setTimeout`)
// * an immediate (`setImmediate`)
// * a file read (`fs.readFile`)
// * a nextTick
// * a promise

// ---

// ### ** Microtasks before event loop continues**

// After the synchronous code:

// * First: `process.nextTick()`
// * Then: Promise `.then()`
//  Output now:

// ```
// a:999
// last line of program
// Process.nexttick
// promise
// ```

// ---

// ### ** Event Loop Starts — Timer Phase**

// Runs all **timers** (like `setTimeout`).

//  Output now:

// ```
// a:999
// last line of program
// Process.nexttick
// promise
// setimeout
// ```

// ---

// ### ** Poll Phase (I/O callbacks)**

// Now Node checks for **completed I/O operations**, such as `fs.readFile`.

// But here’s the trick  —
// At this point, **the file may NOT be fully read yet**, because file system I/O is **asynchronous and slower** than setting a timer or an immediate.

// So the poll phase finds:

// * No ready I/O callback yet
//   → event loop **moves to the next phase** (check phase).

// ---

// ### ** Check Phase (SetImmediate)**

// `setImmediate()` callbacks always run in the **check phase**,
// which comes **right after** the poll phase.

//  Output now:

// ```
// setImmediate
// ```

// ---

// ### **= Next Tick — Poll Phase (later iteration)**

// Now that the OS has completed the file read,
// the poll phase runs again and executes your `fs.readFile` callback.

//  Output finally:

// ```
// file data
// ```

// ---

// ##  Final Output (Explained)

// ```
// a:999
// last line of program
// Process.nexttick
// promise
// setimeout
// setImmediate
// file data
// ```

// ---

// ##  Why `setImmediate` Appears *Before* File Data

// Let’s look at the **timing hierarchy**:

// | Action                 | Where It Runs   | When It Runs              | Why                            |
// | ---------------------- | --------------- | ------------------------- | ------------------------------ |
// | `process.nextTick`     | microtask queue | before event loop         | highest priority               |
// | `Promise.then`         | microtask queue | after nextTick            | still before event loop        |
// | `setTimeout(0)`        | timers phase    | first event loop tick     | executes early                 |
// | `setImmediate()`       | check phase     | after poll phase          | runs before slow I/O completes |
// | `fs.readFile` callback | poll phase      | after file read completes | runs in later loop             |

//  So the reason `setImmediate` **is not last**
// is because the **file reading (poll phase)** takes longer to complete than reaching the **check phase**, where `setImmediate` is handled **immediately**.

// ---

// ###  Quick Summary

// | Function             | Executes In  | Priority                    |
// | -------------------- | ------------ | --------------------------- |
// | `process.nextTick()` | Microtask    | 🔝 Highest                  |
// | `Promise.then()`     | Microtask    | 🔝 After nextTick           |
// | `setTimeout()`       | Timers Phase | 🕒 First event loop tick    |
// | `setImmediate()`     | Check Phase  | 🕓 After poll               |
// | `fs.readFile()`      | Poll Phase   | 🕔 After file I/O completes |

// ---

// So to answer your question directly 

// > “Why not `setImmediate` last?”

// Because the **I/O (fs.readFile)** callback runs **in the poll phase after the check phase** —
// and the **check phase** (where `setImmediate` runs) happens **before the poll phase processes I/O callbacks that aren’t ready yet**.

// That’s why you see:

// ```
// setImmediate
// file data
// ```

// instead of the reverse.

