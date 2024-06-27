

const mongoose = require("mongoose")

const dotenv = require("dotenv");

dotenv.config();


const connectionURL = process.env.MONGO_DB_CONNECTION_STRING



const connectToDb = () => {
  mongoose.connect(connectionURL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = { connectToDb }