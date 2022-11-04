require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());

const Model = require("./models/model");

app.post("/post", async (req, res) => {
  Model.findOneAndUpdate(
    { mobile: req.body.mobile },
    {
      name: req.body.name,
      mobile: req.body.mobile,
      city: req.body.city,
      score: req.body.score,
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

app.get("/getLeaderboard", async (req, res) => {
  try {
    Model.aggregate([{ $sort: { time: -1 } }, { $limit: 10 }]).exec(
      function (err, data) {
        res.json(data);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
