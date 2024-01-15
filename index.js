require("dotenv").config();
require("./db/db.connect");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

const scheduleRouter = require("./routes/schedule.route");

const fs = require("fs");

const jsonData = fs.readFileSync("./data/data.json");
const personData = JSON.parse(jsonData);

const Email = require("./models/email.model");

const seedEmailDatabase = async () => {
  try {
    for (const email of personData) {
      const newData = new Email(email);
      await newData.save();
      console.log(`Email ${newData.title} seeded`);
    }
    console.log("Email database seeded successfully");
  } catch (error) {
    console.log("Error seeding email database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedEmailDatabase();

app.use(express.json());

app.use(cors());
app.use(helmet());

app.use("/schedules", scheduleRouter);

app.use("/", (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Email Schedule APIs");
});

app.use("/", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Server Started"));
