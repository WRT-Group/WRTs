const User = require("../model/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { fName, lName, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fName,
      lName,
      username,
      email,
      password: hashedPassword,
      NFTs: [],
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.token,
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup };
