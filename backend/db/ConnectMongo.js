const mongoose = require("mongoose");
const { MONGO_DB_URI } = require("../constants");

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(
      MONGO_DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected...`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectMongoDB;