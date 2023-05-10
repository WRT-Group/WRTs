const NFT=require('../model/NFT.js')

const getAll= async(req,res)=>{
    const data=await NFT.find({}).lean();
    res.json(data)
}
const addNFTs=async(req,res)=>{
    await NFT.insertMany(req.body)
    res.json('created')
}
const edit=async(req,res)=>{
    await NFT.updateOne({_id:req.params.id},{nftName:req.body.nftName,price:req.body.price,image:req.body.image,description:req.body.description,owner:req.body.owner})
    res.json('updated')
}
const remove=async(req,res)=>{
    await NFT.deleteOne({_id:req.params.id})
    res.json('deleted')
}
const search=(req,res)=>{
    const { query }=req.query
    NFT.find({nftName: {$regex:new RegExp(query,"i")}}).then(nft=>res.send(nft))
}

module.exports={
    getAll,addNFTs,edit,search,remove
}