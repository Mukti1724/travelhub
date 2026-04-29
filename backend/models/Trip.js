const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: String,   // which user owns this trip
  name: String,
  people: [String],
  expenses: [
    {
      amount: Number,
      paidBy: String,
      desc: String,
      splitBetween: [String],
    },
  ],
});

module.exports = mongoose.model("Trip", tripSchema);