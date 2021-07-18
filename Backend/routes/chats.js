const router = require("express").Router();
const { index, store } = require("../app/Controllers/ChatController");
const authMiddleware = require("../app/Middlewares/auth");

router.get("/", authMiddleware, index);
router.post("/", authMiddleware, store);

module.exports = router;
