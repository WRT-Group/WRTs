const NFT = require("../model/NFT.js");
const User = require("../model/user.js");
const cloudinary = require("cloudinary").v2;

const getAll = async (req, res) => {
  const data = await NFT.find({}).lean();
  res.json(data);
};

const getOne = async (req, res) => {
  const data = await NFT.findById({ _id: req.params.id });
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
    const imageUrl = await cloudinary.uploader.upload(image);

    const newNFT = new NFT({
      nftName,
      price,
      owner,
      image: imageUrl.secure_url,
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
    let imageUrl = await NFT.findOne({ _id: req.params.id });
    if (req.body.image) {
      imageUrl = await cloudinary.uploader.upload(req.body.image);
    }

    await NFT.updateOne(
      { _id: req.params.id },
      {
        nftName: req.body.nftName,
        price: req.body.price,
        image: imageUrl.secure_url || imageUrl.image,
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

const buy=async(req,res)=>{
  const { nftId, price, sellerid ,buyerid }=req.body
  console.log(sellerid)
    const seller=await User.findOne({_id: sellerid})
    const buyer=await User.findOne({_id: buyerid})
    console.log(seller)
    console.log(buyer)
    const sellerBalance=seller.balance
    const buyerBalance=buyer.balance

    const updatedSellerBalance=sellerBalance+price
    await User.findByIdAndUpdate(sellerid, {balance: updatedSellerBalance, $pull:{NFTs: nftId}})

    const updatedBuyerBalance=buyerBalance-price
    await User.findByIdAndUpdate(buyerid,{balance: updatedBuyerBalance, $push:{NFTs: nftId }})

    await NFT.findByIdAndUpdate(nftId,{owner: buyerid})

    return res.send("Purchase Successful!")
}

module.exports = {
  getAll,
  getByUser,
  addNFT,
  edit,
  search,
  remove,
  getOne,
  buy
};
