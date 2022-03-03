const express = require("express");
const UserCtrl = require("../controllers/UserController");
const {authMdw, requireAdmin} = require("../middlewares/auth");
const router = express.Router();

router.get("/", authMdw, requireAdmin, async (req, res) => {
    const users = await UserCtrl.getUsers(req.user);
    res.json(users);
});

router.get("/:id", authMdw, () => {
    
});

module.exports = router;