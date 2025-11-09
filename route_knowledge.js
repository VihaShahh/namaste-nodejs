// Perfect 👏 Viha — this is an excellent question because it shows you’re thinking like a **backend engineer** now. Let’s break it down very clearly and with examples.

// ---

// ## 🧩 Your Code (recap)

// ```js
// import express from "express";

// const app = express();

// app.use("/", (req, res) => {
//   res.send("hello from express server");
// });

// app.use("/about", (req, res) => {
//   res.send("about page");
// });

// app.listen(3009, () => {
//   console.log("server is successfully listening on port 3009");
// });
// ```

// ---

// ## ⚙️ How Express matches routes

// Express checks the **path of the incoming request** (like `/`, `/about`, `/hello`, etc.) and matches it against the routes you define.

// * `app.use()` → means “match this route **and everything that starts with it**”
// * `app.get()` → means “match this **exact route only**”

// ---

// ## 🧠 Scenario 1: You wrote

// ```js
// app.use("/", (req, res) => {
//   res.send("hello from express server");
// });
// ```

// ### What happens?

// This matches **every request** because every URL starts with `/`.

// 👉 So:

// | Request URL        | Response                  |
// | ------------------ | ------------------------- |
// | `/`                | hello from express server |
// | `/about`           | hello from express server |
// | `/hello`           | hello from express server |
// | `/anything/random` | hello from express server |

// That’s why your `/about` route never runs — because Express matches `/` first, sends a response, and **stops**.

// ---

// ## 🧠 Scenario 2: You move `/` route **after** `/about`

// ```js
// app.use("/about", (req, res) => {
//   res.send("about page");
// });

// app.use("/", (req, res) => {
//   res.send("hello from express server");
// });
// ```

// Now:

// | Request URL | Response                  |
// | ----------- | ------------------------- |
// | `/about`    | about page                |
// | `/`         | hello from express server |
// | `/hello`    | hello from express server |
// | `/random`   | hello from express server |

// So order matters! Express checks routes **from top to bottom**.

// ---

// ## 🧠 Scenario 3: You define a **specific route**

// ```js
// app.use("/hello", (req, res) => {
//   res.send("Hello route");
// });
// ```

// Now:

// | URL              | Response                                                |
// | ---------------- | ------------------------------------------------------- |
// | `/hello`         | Hello route                                             |
// | `/hello/2`       | Hello route ✅ (because `/hello/2` starts with `/hello`) |
// | `/hello/abc/xyz` | Hello route ✅                                           |
// | `/about`         | about page                                              |
// | `/`              | hello from express server                               |

// Because `.use("/hello")` matches **all subpaths starting with `/hello`**.

// ---

// ## 🧠 Scenario 4: You want **exact match only**

// If you only want `/hello` and not `/hello/2`, use:

// ```js
// app.get("/hello", (req, res) => {
//   res.send("Hello only");
// });
// ```

// Now:

// | URL               | Response        |
// | ----------------- | --------------- |
// | `/hello`          | Hello only      |
// | `/hello/2`        | ❌ 404 Not Found |
// | `/hello/anything` | ❌ 404 Not Found |

// ---

// ## 💡 In summary

// | Route definition    | Matches                                 | Notes                           |
// | ------------------- | --------------------------------------- | ------------------------------- |
// | `app.use("/")`      | everything                              | because all URLs start with `/` |
// | `app.use("/hello")` | `/hello`, `/hello/2`, `/hello/anything` | prefix match                    |
// | `app.get("/hello")` | `/hello` only                           | exact match                     |
// | Order matters       | ✅                                       | first match wins                |

// ---

// If you want to **see multiple responses (like `/about` and `/hello` both working)**, make sure the `/` route is **last** in your file.

// Would you like me to rewrite your code showing all 3 routes (`/`, `/about`, `/hello`) working properly together?
