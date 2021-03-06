const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;

const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('Something went wrong try later again');
  }
};

const authAdmin = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (user.isAdmin) {
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
