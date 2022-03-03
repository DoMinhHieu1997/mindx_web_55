const { findAllUsers } = require("../database/user");

const getUsers = async () => {
    const users = await findAllUsers();
    return users;
};

module.exports = { getUsers };