const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const uploadRouter = require("./upload");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/upload", uploadRouter);

module.exports = router;