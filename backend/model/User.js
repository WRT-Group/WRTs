const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema({
  fName: String,
  lName: String,
  username: String,
  password: String,
  email: String,
  NFTs: Array,
});

module.exports = Mongoose.model("user", userSchema);
