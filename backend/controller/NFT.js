const NFT = require("../model/NFT.js");
const User = require("../model/user.js");

const getAll = async (req, res) => {
  const data = await NFT.find({}).lean();
  res.json(data);
};

const getOne = async (req, res) => {
  const data = await NFT.find({ _id: req.params.id });
  res.json(data);
};

const getByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const NFTs = await NFT.find({ owner: id }).lean();
    res.status(200).json(NFTs);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addNFT = async (req, res) => {
  try {
    const { nftName, price, owner, image, description } = req.body;

    const newNFT = new NFT({
      nftName,
      price,
      owner,
      image,
      description,
    });

    await newNFT.save();
    await User.updateOne(
      { _id: owner },
      { $push: { NFTs: newNFT._id.toString() } }
    );

    res.status(201).json({ message: "NFT added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const edit = async (req, res) => {
  try {
    await NFT.updateOne(
      { _id: req.params.id },
      {
        nftName: req.body.nftName,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
      }
    );
    res.json({ message: "updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const search = (req, res) => {
  const { query } = req.query;
  NFT.find({ nftName: { $regex: new RegExp(query, "i") } }).then((nft) =>
    res.send(nft)
  );
};
const remove = async (req, res) => {
  await User.updateOne(
    { _id: req.params.userId },
    { $pull: { NFTs: req.params.id } }
  );
  await NFT.deleteOne({ _id: req.params.id });
  res.json("deleted");
};
module.exports = {
  getAll,
  getByUser,
  addNFT,
  edit,
  search,
  remove,
  getOne,
};
