const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected")
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};
module.exports = connectDatabase;
