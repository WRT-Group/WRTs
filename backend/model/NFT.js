const mongoose = require('mongoose');

const schema=mongoose.Schema({
    nftName: String,
    price: Number,
    owner: String,
    image: String,
    description: String
})

const NFT=mongoose.model("NFT",schema)

module.exports=NFT
