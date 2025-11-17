// all routes here
// Error-handling middleware should always be added after all routes, like this:

// app.get('/', ... );
// app.post('/login', ... );

// // error handler at last
// app.use((err, req, res, next) => {
//   //...
// });

//==================================================

// How is it called? (2 ways)

// Express does not call error handler by default.
// It only calls it when:

//  1. An error is thrown

// Example:

// app.get('/test', (req, res) => {
//   throw new Error("Unexpected error!");
// });


// Since an error is thrown, Express automatically goes to your error handler:

// app.use((err, req, res, next) => {
//   // THIS WILL RUN
// });

//  2. You manually send error using next(err)

// Example:

// app.get('/user', (req, res, next) => {
//   const err = new Error("User not found");
//   next(err);   // Calls the error handler
// });


// Now Express will skip all other routes and directly call:

// app.use((err, req, res, next) => {
//   res.status(404).send(err.message);
// });

// VERY SIMPLE VISUAL EXPLANATION
// You:

// Ask Express to run a route.

// Express:

// Tries to run it.

// If the route has an error:

// Express says → “I must call the error-handling middleware!”

// Then Express runs:
// app.use((err, req, res, next) => { ... });
//====================================================================
//final example
import express from "express";

const app = express();

// Normal route
app.get('/', (req, res) => {
  res.send("Home Page");
});

// Route with error
app.get('/error', (req, res) => {
  throw new Error("Something broke!");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.log("Error received:", err.message);
  res.status(500).send("Custom Error: " + err.message);
});

app.listen(3009);

