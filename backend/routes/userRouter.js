const router = require("./NFTRouter");
const { signup, login,getOneUser ,update}=require("../controller/user")

router.post("/signup", signup);
router.post("/login", login)

router.get("/:id",getOneUser)
router.put('/:id',update)
module.exports = router;
