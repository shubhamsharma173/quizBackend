const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  mobile: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  score: {
    required: true,
    type: Number,
  },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Participant", dataSchema);
