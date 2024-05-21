const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URL  = process.env.MongoURL;
const connection = mongoose.connect(URL);
module.exports = {
    connection
}