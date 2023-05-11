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
  search 
} = require("../controller/user");
const authenticate = require("../middleware/authenticate.js");

router.get("/getUsers", getUsers);
router.get("/:id", getOneUser);
router.get("/owner/:id", getUserByOwner);
router.get("/search", search)

router.post("/signup", signup);
router.post("/login", login);

router.put('/:id',update)
router.put("/ban/:id", banUser)
router.put("/unban/:id", unbanUser)
router.put("/makeAdmin/:id", makeAdmin)

router.delete("/delete/:id", removeUser)

module.exports = router;
