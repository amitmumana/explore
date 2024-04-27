const { Router } = require("express");
const auth = require("../controllers/auth");

const router = Router();

router.get("/signup", auth.signup_get);
router.post("/signup", auth.createUser);
router.get("/login", auth.login_get);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

module.exports = router;
