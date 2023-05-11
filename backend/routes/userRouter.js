const router = require("express").Router();

const {
  signup,
  login,
  getUsers,
  getOneUser,
  update,
  getUserByOwner,
} = require("../controller/user");
const authenticate = require("../middleware/authenticate.js");

router.get("/getUsers", getUsers);
router.get("/:id", getOneUser);
router.get("/owner/:id", getUserByOwner);

router.post("/signup", signup);
router.post("/login", login);

router.put("/:id", update);

module.exports = router;
