const express = require('express');
const router = express.Router();
const { getAll, addNFTs, edit }=require('../controller/NFT.js')



router.get('/getAll', getAll);
router.post('/post', addNFTs)
router.put('edit/:id', edit)

module.exports = router;