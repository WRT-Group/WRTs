const router=require("express").Router()
const { getWallets, add }=require("../controller/wallet")

router.get("/getWallets", getWallets)

router.post("/add" , add)

module.exports=router