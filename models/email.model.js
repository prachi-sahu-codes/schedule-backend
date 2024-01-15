const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      default: "Daily",
    },
    repeat: {
      type: [String],
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
