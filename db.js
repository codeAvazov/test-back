const mongoose = require("mongoose");

async function db() {
  try {
    await mongoose.connect(
      "mongodb+srv://ulug:test1717@cluster0.wvqoe.mongodb.net/rg1db?retryWrites=true&w=majority"
    );
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = db;
