const express = require("express");
const router = express.Router();

const { getAll, addNFT, edit, search, remove,getOne }=require('../controller/NFT.js')


router.get("/getAll", getAll);
router.get("/search", search);
router.get('/getOne/:id',getOne)
router.post("/add", addNFT);

router.put('/edit/:id', edit)

router.delete('/delete/:id',remove)

module.exports = router;
