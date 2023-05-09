const router = require("./NFTRouter");
const { signup }=require("../controller/user")

router.post("/signup", signup);

module.exports = router;
