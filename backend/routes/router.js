const express = require('express');
const router = express.Router();
const x=require('../controller/controller.js')



router.get('/NFTs',x.getAll);
router.post('/NFTs',x.addNFTs)
router.put('/NFTs/:id',x.edit)

module.exports = router;