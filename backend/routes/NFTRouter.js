const express = require("express");
const router = express.Router();

const {
  getAll,
  addNFT,
  edit,
  search,
  remove,
  getOne,
  getByUser,
  buy
} = require("../controller/NFT.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/getAll", getAll);
router.get("/search", search);
router.get("/owner/:id", getByUser);
router.get("/getOne/:id", getOne);

router.post("/add", authenticate, addNFT);

router.put("/edit/:id", authenticate, edit);
router.put("/purchase", authenticate, buy)

router.delete("/delete/:id/:userId", authenticate, remove);

module.exports = router;
