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

router.put("/updateUser/:id", update);
router.put("/ban/:id", banUser);
router.put("/unban/:id", unbanUser);
router.put("/makeAdmin/:id", makeAdmin);
//change password route
router.put("/changePassword/:id",changePassword)

router.delete("/delete/:id", removeUser);

module.exports = router;
