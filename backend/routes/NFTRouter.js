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
} = require("../controller/NFT.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/getAll", getAll);
router.get("/search", search);
router.get("/:id", getByUser);
router.get("/getOne/:id", getOne);

router.post("/add", authenticate, addNFT);

router.put("/edit/:id", authenticate, edit);

router.delete("/delete/:id/:userId", authenticate, remove);

module.exports = router;
