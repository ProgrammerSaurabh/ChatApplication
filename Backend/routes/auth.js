const router = require("express").Router();
const { login, register } = require("../app/Controllers/AuthController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
