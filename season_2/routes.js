app.get('/test',
  (req, res, next) => {
    console.log("Step 1");
    next(); // go to Step 2
  },
  (req, res, next) => {
    console.log("Step 2");
    next(); // go to Step 3
  },
  (req, res) => {
    console.log("Step 3");
    res.send("Done");
  }
);

//Example of next('route')
app.get('/test',
  (req, res, next) => {
    console.log("Handler A");
    next('route'); // skip remaining and jump to next route
  },
  (req, res) => {
    console.log("Handler B");
    res.send("You will NOT see this");
  }
);
app.get('/test', (req, res) => {
  console.log("Handler C");
  res.send("Reached second route");
});

//==========================================
// Route 1 → For ADMIN
app.get('/profile', (req, res, next) => {
  if (!req.user.isAdmin) {
    return next('route'); // user is NOT admin → jump to next route
  }
  res.send("Admin Profile");
});

// Route 2 → For NORMAL USER
app.get('/profile', (req, res) => {
  res.send("User Profile");
});
// Scenario 1 → User is Admin

// First route runs

// if (!req.user.isAdmin) is FALSE

// We send Admin Profile

// DONE ✔️

// Scenario 2 → User is NOT Admin

// First route runs

// Condition is TRUE

// We call next('route')

// Express skips the remaining handlers in that route

// Express jumps to the next /profile route

// Sends User Profile

// DONE ✔️