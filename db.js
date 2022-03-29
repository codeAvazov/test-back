const mongoose = require("mongoose");

async function db(path) {
  try {
    await mongoose.connect(
      path
    );
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = db;
