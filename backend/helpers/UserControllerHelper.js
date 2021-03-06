const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerInputValidation = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(user);
};

const loginInputValidation = (user) => {
  const schemaEmail = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });
  const schemaUsername = Joi.object({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
  });
  const validEmail = schemaEmail.validate(user);
  const validUsername = schemaUsername.validate(user);

  return {
    emailInput: validEmail.error ? false : true,
    usernameInput: validUsername.error ? false : true,
    validatedInput: user.email ? validEmail : validUsername,
  };
};

const findUser = async (input) => {
  if (input.email) {
    const user = await User.findOne({ email: input.email });
    return user;
  } else {
    const user = await User.findOne({ username: input.username });
    return user;
  }
};

const userExistCheck = async (username, email) => {
  const usernameExist = await User.findOne({ username: username });
  const emailExist = await User.findOne({ email: email });

  if (usernameExist && emailExist) {
    return { sucsess: true, msg: 'You are already registered ' };
  } else if (usernameExist) {
    return { sucsess: true, msg: 'Username is already taken' };
  } else if (emailExist) {
    return { sucsess: true, msg: 'Email is already registered' };
  } else {
    return { sucsess: false, msg: '' };
  }
};

const issueToken = async (user, userToLogin) => {
  const validPass = await bcrypt.compare(userToLogin.password, user.password);
  if (!validPass) return { success: false, message: 'Invalid Password' };

  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return { success: true, token: token };
};

module.exports.registerInputValidation = registerInputValidation;
module.exports.loginInputValidation = loginInputValidation;
module.exports.userExistCheck = userExistCheck;
module.exports.findUser = findUser;
module.exports.issueToken = issueToken;
