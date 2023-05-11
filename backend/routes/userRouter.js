const router = require("./NFTRouter");

const { signup, login, getUsers, getOneUser, update }=require("../controller/user")

router.get("/getUsers", getUsers)
router.get("/:id",getOneUser)

router.post("/signup", signup);
router.post("/login", login)

router.put('/:id',update)

module.exports = router;
