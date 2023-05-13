const router = require("express").Router();
const {
  signup,
  login,
  getUsers,
  getOneUser,
  update,
  getUserByOwner,
  banUser,
  unbanUser,
  makeAdmin,
  removeUser,
  search,
  changePassword,
} = require("../controller/user");
const authenticate = require("../middleware/authenticate.js");

router.get("/getUsers", getUsers);
router.get("/search", search);
router.get("/getUser/:id", getOneUser);
router.get("/owner/:id", getUserByOwner);

router.post("/signup", signup);
router.post("/login", login);

router.put("/updateUser/:id", authenticate, update);
router.put("/ban/:id", authenticate, banUser);
router.put("/unban/:id", authenticate, unbanUser);
router.put("/makeAdmin/:id", authenticate, makeAdmin);

router.put("/changePassword/:id", authenticate, changePassword)

router.delete("/delete/:id", authenticate, removeUser);

module.exports = router;
