const NFT = require("../model/NFT.js");
const User = require("../model/user.js");

const getAll = async (req, res) => {
  const data = await NFT.find({}).lean();
  res.json(data);
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
    // await User.updateOne({ _id: owner }, { $push: { NFTs: newNFT._id } });

    res.status(201).json({ message: "NFT added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
const edit = async (req, res) => {
  await NFT.updateOne(
    { _id: req.params.id },
    {
      nftName: req.body.nftName,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      owner: req.body.owner,
    }
  );
  res.json("updated");
};

const search = (req, res) => {
  const { query } = req.query;
  NFT.find({ nftName: { $regex: new RegExp(query, "i") } }).then((nft) =>
    res.send(nft)
  );
};

module.exports = {
  getAll,
  addNFT,
  edit,
  search,
};
