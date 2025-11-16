import express from "express";

const app = express();

// ---------------------
// USER AUTH MIDDLEWARE
// ---------------------
const userAuth = (req, res, next) => {
  console.log("User auth is being checked");

  const token = req.headers.token;   // User token should be in header
  const isAuthorized = token == "user-abc";

  if (!isAuthorized) {
    return res.status(401).send("Unauthorized user request");
  }

  next();
};

// ---------------------
// ADMIN AUTH MIDDLEWARE
// ---------------------
const adminAuth = (req, res, next) => {
  console.log("Admin auth is being checked");

  const token = req.headers.token;   // Admin token should be in header
  const isAuthorized = token === "admin-xyz";

  if (!isAuthorized) {
    return res.status(401).send("Unauthorized admin request");
  }

  next();
};

// ---------------------
// USER ROUTES
// ---------------------
app.get("/user/profile", userAuth, (req, res) => {
  res.send("User profile data");
});

app.get("/user/orders", userAuth, (req, res) => {
  res.send("User order history");
});

// ---------------------
// ADMIN ROUTES
// ---------------------
app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("All admin data");
});

app.get("/admin/deleteUser", adminAuth, (req, res) => {
  res.send("Admin deleted a user");
});

// ---------------------
// START SERVER
// ---------------------
app.listen(3009, () => {
  console.log("Server running on port 3009");
});
