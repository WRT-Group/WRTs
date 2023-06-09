const wallet=require("../model/wallet")
const user=require("../model/user")

module.exports={
  
  deposit:async (req,res)=>{
    try {
      const { userid }=req.params
      const { walletid, securityKey, amount }=req.body
      console.log(amount)
      if(!walletid || !userid || !securityKey || !amount){
        console.log(walletid,userid,securityKey,amount)
        return res.send("fill all fields")
      }
  
      const currentWallet=await wallet.findOne({ _id: walletid })
      if(!currentWallet){
        return res.send("wallet doesn't exist")
      }
      if(currentWallet.securityKey!==securityKey){
        return res.send("Invalid Security Key")
      }
      const walletBalance=currentWallet.balance
  
      if (walletBalance < amount) {
        return res.send("Insufficient balance in the wallet")
      }
  
      const updatedWalletBalance=walletBalance-amount
      await wallet.findByIdAndUpdate(walletid, { balance: updatedWalletBalance })
  
      const currentUser=await user.findOne({ _id: userid })
      const userBalance=currentUser.balance;
      const updatedUserBalance=userBalance+amount;
      await user.findByIdAndUpdate(userid, { balance: updatedUserBalance })
  
      const updatedUser = await user.findOne({_id: userid})
      return res.json({message: "Balance transferred successfully", updatedUser: {balance: updatedUser.balance}})
    }
      catch (error) {
        return res.status(500).json({ error: "Internal server error" })
      }
  },
}