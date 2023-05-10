const express = require("express");
const router = express.Router();

const { getAll, addNFTs, edit, search, remove }=require('../controller/NFT.js')


router.get("/getAll", getAll);
router.get("/search", search);

router.post("/add", addNFT);

router.put('/edit/:id', edit)

router.delete('/delete/:id',remove)

module.exports = router;
