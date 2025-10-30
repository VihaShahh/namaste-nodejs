console.log("SetTimeoutZero demonstration");

var a = 5;
var b = 10;

setTimeout(() => {
    console.log("SetTimeout function after 3 seconds");
}, 3000);

// this function will only be pushed into the call stack
// once it becomes empty — even if delay = 0
setTimeout(() => {
    console.log("Call me asap");
}, 0); // “Trust issues with setTimeout ”

function multiply(x, y) {
    const result = x * y;
    return result;
}

const c = multiply(a, b);
console.log("Multiplication answer is : " + c);


//  Key Concept: Event Loop + `setTimeout(0)`

// In JavaScript (Node.js or browser):

// * **Synchronous code** runs first — line by line.
// * **`setTimeout()`** schedules the callback in the **timer queue**, not immediately in the call stack.
// * Even if you give it `0 ms`, the callback will **wait until the call stack is empty** (and after all synchronous code finishes).
// * That’s why we joke: “You can’t trust `setTimeout(0)` to run instantly.”

// ---

// ###  Step-by-Step Execution Flow

// #### 

// ```
// console.log("SetTimeoutZero demonstration");
// ```

// → Output:

// ```
// SetTimeoutZero demonstration
// ```

// #### 

// Variables `a` and `b` are declared.

// #### 

// `setTimeout(..., 3000)` → registers a **timer** for 3 seconds later.
// Callback saved, **not executed now**.

// #### 

// `setTimeout(..., 0)` → registers another **timer** with `0 ms` delay.
// Still **won’t execute immediately** — it waits until the **main thread** is empty.

// #### 

// Function `multiply` is defined and called immediately:

// ```js
// const c = multiply(a, b);
// ```

// → calculates `5 * 10 = 50`.

// Then:

// ```
// Multiplication answer is : 50
// ```

// #### 

// After all synchronous code is done,
// the **event loop** picks up the 0-second timer first:

// ```
// Call me asap
// ```

// #### 

// After ~3 seconds:

// ```
// SetTimeout function after 3 seconds
// ```

// ---

// ###  **Final Output Order**

// ```
// SetTimeoutZero demonstration
// Multiplication answer is : 50
// Call me asap
// SetTimeout function after 3 seconds
// ```

// ---

// ###  Why This Happens

// | Code Type                          | Example                       | When It Runs               |
// | ---------------------------------- | ----------------------------- | -------------------------- |
// | **Synchronous**                    | `console.log`, `multiply()`   | Immediately, top to bottom |
// | **Asynchronous (setTimeout 0)**    | waits for call stack to clear | After all sync code        |
// | **Asynchronous (setTimeout 3000)** | timer delay 3s                | After 3s + stack clear     |

// Even though you gave **0 ms**, it doesn’t mean “immediate execution” —
// it means **“execute as soon as possible after the current code finishes.”**

