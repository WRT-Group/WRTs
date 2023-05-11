const router = require("./NFTRouter");
const { signup, login, getUsers }=require("../controller/user")

router.get("/getUsers", getUsers)

router.post("/signup", signup);
router.post("/login", login)

module.exports = router;
