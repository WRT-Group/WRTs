const router=require("express").Router()
const { getWallets, add, deposit, buy }=require("../controller/wallet")

router.get("/getWallets", getWallets)

router.post("/add", add)

router.put("/deposit/:userid", deposit)

module.exports=router