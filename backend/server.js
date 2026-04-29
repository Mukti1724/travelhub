const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */
mongoose.connect("mongodb://127.0.0.1:27017/travelhub")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================= MODELS ================= */

// USER MODEL
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// TRIP MODEL
const Trip = require("./models/Trip");

/* ================= ROUTES ================= */

// TEST
app.get("/", (req, res) => {
  res.send("API Running...");
});

/* ---------- SIGNUP ---------- */
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.json({ message: "Error occurred" });
  }
});

/* ---------- LOGIN ---------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Invalid credentials" });
    }

  } catch (err) {
    res.json({ message: "Error occurred" });
  }
});

/* ---------- CREATE TRIP ---------- */
app.post("/trip", async (req, res) => {
  const { userId, name } = req.body;

  try {
    const newTrip = new Trip({
      userId,
      name,
      people: [],
      expenses: [],
    });

    await newTrip.save();

    res.json({ message: "Trip created successfully" });

  } catch (err) {
    res.json({ message: "Error creating trip" });
  }
});

/* ---------- GET SINGLE TRIP ---------- */
app.get("/trip/single/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.json(trip);
  } catch (err) {
    res.json({ message: "Error fetching trip" });
  }
});

/* ---------- GET USER TRIPS ---------- */
app.get("/trip/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const trips = await Trip.find({ userId });
    res.json(trips);

  } catch (err) {
    res.json({ message: "Error fetching trips" });
  }
});

/* ---------- GET SINGLE TRIP ---------- */
// app.get("/trip/single/:id", async (req, res) => {
//   try {
//     const trip = await Trip.findById(req.params.id);
//     res.json(trip);
//   } catch (err) {
//     res.json({ message: "Error fetching trip" });
//   }
// });

/* ---------- UPDATE TRIP ---------- */
app.put("/trip/:id", async (req, res) => {
  try {
    const { people, expenses } = req.body;

    await Trip.findByIdAndUpdate(req.params.id, {
      people,
      expenses,
    });

    res.json({ message: "Trip updated" });
  } catch (err) {
    res.json({ message: "Error updating trip" });
  }
});

/* ---------- DELETE TRIP ---------- */
app.delete("/trip/:id", async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.json({ message: "Error deleting trip" });
  }
});

/* ================= SERVER ================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});