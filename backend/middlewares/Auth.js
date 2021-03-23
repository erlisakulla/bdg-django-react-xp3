/**
 * Import required modules
 */
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

/**
 * @description Function to authenticate a Student type User
 * @param {any} req represents the HTTP request
 * @param {any} res represents the HTTP response
 * @param {any} next to go to the next middleware function in the stack
 * @returns {any} status of the response
 */
const auth = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findByPk(verified._id);
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('Something went wrong try later again');
    }
};

/**
 * @description Function to authenticate an Instructor type User
 * @param {any} req represents the HTTP request
 * @param {any} res represents the HTTP response
 * @param {any} next to go to the next middleware function in the stack
 * @returns {any} status of the response
 */
const authAdmin = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findByPk(verified._id);
        if (user.isInstructor) {
            req.user = user;
            next();
        } else {
            return res.status(401).send('Access Denied');
        }
    } catch (err) {
        res.status(400).send('Something went wrong try later again');
    }
};

module.exports.auth = auth;
module.exports.authAdmin = authAdmin;
