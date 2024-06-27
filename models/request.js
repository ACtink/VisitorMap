


const mongoose = require("mongoose")


const requestSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    unique: true,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Request = mongoose.model("request", requestSchema);
Request.createIndexes();

module.exports =  {Request};