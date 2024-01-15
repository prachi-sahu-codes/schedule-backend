const express = require("express");
const Email = require("../models/email.model");
const scheduleRouter = express.Router();

//search by title

scheduleRouter.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let query = {};
    if (searchQuery) {
      query = { title: { $regex: new RegExp(searchQuery, "i") } };
    }
    const emails = await Email.find(query);

    res.status(200).json({
      success: true,
      data: emails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch the emails",
      error: error.message,
    });
  }
});

scheduleRouter.get("/", async (req, res) => {
  try {
    const emails = await Email.find({});
    res.status(200).json({
      success: true,
      data: emails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch the emails",
      error: error.message,
    });
  }
});

// schedule detail

scheduleRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.find({ _id: id });
    console.log({ email });
    res.status(200).json({
      success: true,
      data: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get email detail",
      error: error.message,
    });
  }
});

// Add a email
scheduleRouter.post("/", async (req, res) => {
  try {
    const email = new Email(req.body);
    const savedEmail = await email.save();
    res.status(200).json({
      success: true,
      data: savedEmail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add a email",
      error: error.message,
    });
  }
});

// Update a email
scheduleRouter.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update the email",
      error: error.message,
    });
  }
});

// Delete a email
scheduleRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const email = await Email.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the email",
      error: error.message,
    });
  }
});

module.exports = scheduleRouter;
