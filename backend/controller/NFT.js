const model=require('../model/NFT.js')

const getAll= async(req,res)=>{
    const data=await model.find({}).lean();
    res.json(data)
}
const addNFTs=async(req,res)=>{
    await model.insertMany(req.body)
    res.json('created')
}
const edit=async(req,res)=>{
    await model.updateOne({_id:req.params.id},{nftName:req.body.nftName,price:req.body.price,image:req.body.image,description:req.body.description,owner:req.body.owner})
    res.json('updated')
}
module.exports={
    getAll,addNFTs,edit
}