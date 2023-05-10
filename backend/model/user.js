const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema(
  {
    fName: String,
    lName: String,
    username: String,
    password: String,
    email: String,
    balance: Number,
    NFTs: Array,
    isAdmin: Boolean
  },
  { timestamps: true }
);

module.exports = Mongoose.model("user", userSchema);
