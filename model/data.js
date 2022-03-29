const { Schema, model } = require("mongoose");

const dataSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required !"],
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#000",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("data", dataSchema);
