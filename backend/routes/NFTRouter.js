const express = require("express");
const router = express.Router();
const { getAll, addNFT, edit, search } = require("../controller/NFT.js");

router.get("/getAll", getAll);
router.get("/search", search);

router.post("/add", addNFT);

router.put("edit/:id", edit);

module.exports = router;
