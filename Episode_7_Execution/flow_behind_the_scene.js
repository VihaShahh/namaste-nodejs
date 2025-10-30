

// ###  1. **Parsing (Understanding the code)**

// * V8 first **reads your code** (like reading a book).
// * It **breaks it into small pieces** called **tokens** (words, symbols, etc.).
// * Then it makes a **map of your code** called an **AST (Abstract Syntax Tree)** — this helps V8 understand what your code is trying to do.

// ---

// ###  2. **Ignition (Interpreter starts running)**

// * The **Ignition interpreter** converts the AST into **bytecode** — a simpler version of your code that’s quick to run.
// * It starts **executing the bytecode** right away (so your program starts running fast).

// ---

// ###  3. **Profiling (Watching how the code runs)**

// * While your code runs, V8 **watches which parts run most often** (these are called “hot” functions).
// * It keeps notes on them to decide which parts should be made faster.

// ---

// ###  4. **TurboFan (Optimization for speed)**

// * For the “hot” parts, V8’s **TurboFan compiler** changes the bytecode into **machine code** — super fast code your computer understands directly.
// * If something changes (like a variable suddenly becoming a different type), V8 can **deoptimize** — go back to slower but safer code.

// ---

// ###  5. **Garbage Collection (Cleaning up)**

// * When your program doesn’t need some data anymore, V8 **cleans it from memory** automatically.
// * This helps keep memory usage low and efficient.

// ---

// ###  6. **Final Execution (Running smoothly)**

// * Your **optimized machine code** runs fast and efficiently until the program ends.
// * If something changes, V8 adjusts on the fly.

// ---

//  **In short:**

// > V8 reads → understands → runs → improves → cleans → runs faster 

