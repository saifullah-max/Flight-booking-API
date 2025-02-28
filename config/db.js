const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const LOCAL_URI = process.env.LOCAL_URI;
const REMOTE_URI = process.env.REMOTE_URI;

const connectToMongoDB = async (useRemoteDB) => {
  const uri = useRemoteDB ? REMOTE_URI : LOCAL_URI;

  try {
    await mongoose.connect(uri);
    console.log(`Connected to ${useRemoteDB ? "REMOTE" : "LOCAL"} MONGODB`);
  } catch (error) {
    console.log(`Error while connecting to DB ${error}`);
  }
};

module.exports = connectToMongoDB;
