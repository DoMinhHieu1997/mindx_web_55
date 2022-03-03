const crypto = require("crypto");
const { findByUsername, insertUser } = require("../database/user");
const  jwt = require("jsonwebtoken");

const login = async (username, password) => {
    // Bước 1: Tìm người dùng bằng tái khoản
    const existedUser = await findByUsername(username);
    if (!existedUser) {
        throw new Error("Tài khoản không tồn tại");
    }

    // Bước 2: xác nhận mật khẩu
    if (!verifyPassword(password, existedUser)) {
        throw new Error("Mật khẩu không đúng");
    }

    // Bước 3: tạo jwt
    const token = jwt.sign({userId: existedUser._id}, "MY_PRIVATE_KEY", {
        expiresIn: 60*60,
    });

    return {user: existedUser, token: token};
};

const register = async (username, email, password) => {
    // Bước 1: Kiểm tra tài khoản tồn tại
    const existedUser = await findByUsername(username);
    if (existedUser) {
        throw new Error("Tài khoản đã tồn tại!");
    }

    // Bước 2: Mã hóa mật khẩu
    const {salt, hashedPassword} = encryptPassword(password);

    // Bước 3: Lưu trữ vào CSDL
    const insertedUser = await insertUser({
        username: username,
        email: email,
        salt: salt,
        hashedPassword: hashedPassword,
    });

    return insertedUser;
};

const encryptPassword = (password) => {
    const salt = crypto.randomBytes(128).toString("hex");

    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        hashedPassword: hashedPassword,
    };
};

const verifyPassword = (password, user) => {
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, "sha512").toString("hex");

    return hashedPassword === user.hashedPassword;
};

module.exports = { login, register };