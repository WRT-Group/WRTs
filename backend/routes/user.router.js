const router = require("./router");
const { signup } = require("../controller/user.controller");

router.post("/signup", signup);

module.exports = router;
