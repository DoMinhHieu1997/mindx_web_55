const express = require("express");
const AuthCtrl = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", async (req,res) => {
    // Validation

    //Call logic
    try {
        const loginInfo = await AuthCtrl.login(req.body.username, req.body.password);
        res.json(loginInfo);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/register", async (req,res) => {
    // Validation
    if (!req.body.password || req.body.password.length < 6) {
        res.status(400).send("Mật khẩu phải chứa ít nhất 6 ký tự");
        return;
    }

    // Call logic
    try {
        const newUser = await AuthCtrl.register(req.body.username, req.body.email, req.body.password);
        res.json(newUser);
    } catch (err) {
        res.status(409).send(err.message);
    }
});

module.exports = router;