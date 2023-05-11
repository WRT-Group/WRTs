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
      isAdmin: false
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.token
    );

    return res
      .status(201)
      .json({ token, id: user._id, fName, lName, username, email, NFTs: [] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { user, pass } = req.body;
  const loggedUser = await User.findOne({
    $or: [{ username: user }, { email: user }],
  });
  if (loggedUser) {
    if (await bcrypt.compare(pass, loggedUser.password)) {
      const token = jwt.sign({ id: loggedUser._id }, process.env.token);
      res.send({
        token: token,
        id: loggedUser._id,
        fName: loggedUser.fName,
        lName: loggedUser.lName,
        username: loggedUser.username,
        email: loggedUser.email,
        NFTs: loggedUser.NFTs,
        isAdmin: loggedUser.isAdmin
      });
    } else {
      res.send("incorrect password");
    }
  } else {
    res.send("cannot find user");
  }
};

const getUsers=(req,res)=>{
  User.find().then(users=>res.send(users))
}

module.exports = { signup, login, getUsers };
