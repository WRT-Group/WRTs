const mongoose=require("mongoose")

const walletSchema=mongoose.Schema({
  securityKey: String,
  balance: Number
})

const wallet=mongoose.model("wallet",walletSchema)

module.exports=wallet