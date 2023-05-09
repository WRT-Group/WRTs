const express = require('express');
const router = express.Router();
const { getAll, addNFTs, edit, search }=require('../controller/NFT.js')

router.get('/getAll', getAll)
router.get("/search", search)

router.post('/post', addNFTs)

router.put('edit/:id', edit)

module.exports = router;