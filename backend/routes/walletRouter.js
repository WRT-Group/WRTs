const router=require("express").Router()
const { deposit }=require("../controller/wallet")

const authenticate=require("../middleware/authenticate")

router.put("/deposit/:userid", authenticate, deposit)

module.exports=router