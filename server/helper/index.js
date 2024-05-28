const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const compared = (password, comparePassword) => {
    return bcrypt.compareSync(password, comparePassword);
}

const hashing = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const verifyToken = (payload) => {
    return jwt.verify(payload, process.env.SECRET)
}

const signToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET)
}


module.exports = { compared, hashing, verifyToken, signToken }