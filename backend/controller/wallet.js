const wallet=require("../model/wallet")

module.exports={
  getWallets: (req,res)=>{
    wallet.find().then(wallets=>res.send(wallets))
  },

  add: (req,res)=>{
    const { securityKey, balance }=req.body
    const newWallet={
      securityKey: securityKey,
      balance: balance
    }
    wallet.create(newWallet).then(wallet=>res.send(wallet))
  }
}