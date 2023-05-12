const User = require("../model/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const cloudinary = require("cloudinary").v2;

const signup = async (req, res) => {
  console.log("signing up")
  try {
    const { fName, lName, username, email, password, image } = req.body;
    const imageUrl = await cloudinary.uploader.upload(image);

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fName,
      lName,
      username,
      email,
      image: imageUrl.secure_url,
      password: hashedPassword,
      NFTs: [],
      isAdmin: false,
      isBanned: false,
      balance: 0,
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
    return res.status(500).json(err);
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
        image:loggedUser.image,
        email: loggedUser.email,
        NFTs: loggedUser.NFTs,
        isAdmin: loggedUser.isAdmin,
        isBanned: loggedUser.isBanned,
        balance: loggedUser.balance,
        createdAt: loggedUser.createdAt,
        image: loggedUser.image
      });
    } else {
      res.send("incorrect password");
    }
  } else {
    res.send("cannot find user");
  }
};
const getOneUser = async (req, res) => {
  const data = await User.find({ _id: req.params.id });
  res.json(data);
};

const update = async (req, res) => {
  const { id }=req.params
  const { fName, lName, email, image }=req.body
  var updateData={
    fName: fName,
    lName: lName,
    email: email
  }

  if(image){
    const imageUrl=await cloudinary.uploader.upload(image)
    updateData.image=imageUrl.secure_url
  }

  await User.findByIdAndUpdate(id,updateData)
  User.findById(id).then(user=>res.send(user))
};
//function to change password
const changePassword=async(req,res)=>{
  const hash=await bcrypt.hash(req.body.password,10);
  await User.updateOne({_id:req.params.id},{password:hash})
  res.json("upassword changed")
}
//
const getUsers = async (req, res) => {
  const data = await User.find({}).lean();
  res.json(data);
};

const getUserByOwner = async (req, res) => {
  try {
    const _id = req.params.id;
    res.status(200).json(await User.findById({ _id }));
  } catch (err) {
    return res.status(500).json(err);
  }
};

const banUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, { isBanned: true }).then((user) => res.send(user));
};

const unbanUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, { isBanned: false }).then((user) =>
    res.send(user)
  );
};

const makeAdmin = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, { isAdmin: true }).then((user) => res.send(user));
};

const removeUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id).then((user) => res.send(user));
};

const search = (req, res) => {
  const { query } = req.query;
  User.find({ username: { $regex: new RegExp(query, "i") } }).then((users) =>
    res.send(users)
  );
};

module.exports = {
  signup,
  login,
  getUsers,
  getOneUser,
  update,
  banUser,
  unbanUser,
  getUserByOwner,
  makeAdmin,
  removeUser,
  search,
  changePassword
};
