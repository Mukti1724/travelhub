const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// TEMP STORAGE
let users = [];
let hotels = [];

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});


// ================== SIGNUP ==================
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ message: "All fields required" });
  }

  users.push({ name, email, password });

  res.json({ message: "Signup successful" });
});


// ================== LOGIN ==================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.json({ message: "Invalid credentials" });
  }
});


// ================== HOTEL ==================
app.post("/hotels", (req, res) => {
  const { name, location, price, contact } = req.body;

  if (!name || !location || !price || !contact) {
    return res.json({ message: "All fields required" });
  }

  hotels.push({ name, location, price, contact });

  res.json({ message: "Hotel added successfully" });
});


// ================== GET HOTELS ==================
app.get("/hotels", (req, res) => {
  res.json(hotels);
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});