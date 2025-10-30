const crypto = require("node:crypto");
const { stringify } = require("node:querystring");

console.log("Program started");

// Synchronous version - blocks the thread
crypto.pbkdf2Sync("akshumint999", "salt", 5000000, 20, "sha512");
console.log("First synchronous key is generated");

// Asynchronous version - runs in background
crypto.pbkdf2("akshumint999", "salt", 50000, 20, "sha512", (err, key) => {
    console.log("Below is the asynchronous key of your password");
    console.log(key);
});

// Normal synchronous function
function addition(x, y) {
    const result = x + y;
    return result;
}

var c = addition(5, 10);
console.log("Addition is: " + c);

// Step-by-Step Execution Flow

// #### **Start of Program**

// ```
// Program started
// ```

// This executes immediately — it’s synchronous.

// ---

// #### ** `crypto.pbkdf2Sync(...)`**

// * This is a **CPU-heavy synchronous** function.
// * It **blocks the event loop** until the key derivation (5,000,000 iterations) completes.
// * No other code runs during this time.
// * Once done:

// ```
// First synchronous key is generated
// ```

// ---

// #### ** `crypto.pbkdf2(...)`**

// * This call is **asynchronous** — it offloads work to a thread in Node’s internal **thread pool**.
// * The callback will run **later**, after the computation finishes.
// * It doesn’t block the next lines.

// ---

// #### ** The addition function**

// * Runs immediately (since the async task is still in progress in background).

// ```
// Addition is: 15
// ```

// ---

// #### ** Async callback executes**

// * After `pbkdf2` finishes key generation, Node executes the callback:

// ```
// Below is the asynchronous key of your password
// <Buffer ...some bytes...>
// ```

// *(The `<Buffer ...>` output shows binary data representation of the derived key.)*

// ---

// ###  **Final Output Order (most likely):**

// ```
// Program started
// First synchronous key is generated
// Addition is: 15
// Below is the asynchronous key of your password
// <Buffer ...>
// ```

// ---

// ###  Why This Order?

// | Code Segment                                        | Type  | Blocks Main Thread? | Output Timing              |
// | --------------------------------------------------- | ----- | ------------------- | -------------------------- |
// | `console.log("Program started")`                    | Sync  | yes                   | Immediate                  |
// | `pbkdf2Sync(...)`                                   | Sync  | yes                   | Blocks                     |
// | `console.log("First synchronous key is generated")` | Sync  | yes                   | After pbkdf2Sync completes |
// | `pbkdf2(...)`                                       | Async | no                   | Later, via callback        |
// | `addition(5,10)`                                    | Sync  | yes                   | Immediate                  |
// | Async callback (key printed)                        | Async | no                   | After all sync code done   |

// ---

// ###  Summary in One Line

//  **Synchronous (`pbkdf2Sync`)** blocks everything until done.
//  **Asynchronous (`pbkdf2`)** runs in background and prints result later.

// ---


