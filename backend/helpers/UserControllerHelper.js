/**
 * Import the required modules for UserControllerHelper.js
 */
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { valid } = require("joi");

/**
 * @description Function to check format of entered registration information
 * @param {UserController} user A UserController object
 * @returns {Joi.ObjectSchema<any>} Returns an
 * error if entered registration information is incorrect
 */
const registerInputValidation = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    isInstructor: Joi.bool(),
  });
  return schema.validate(user);
};

/**
 * @description Function to check entered login information
 * @param {UserController} user A UserController object
 * @returns {boolean|boolean|Joi.ValidationResult} Returns
 * an error if entered login information is not correct
 */
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
  // if(user.email){
  //     const schemaEmail = Joi.object({
  //         email: Joi.string().min(6).email().required(),
  //         password: Joi.string().min(6).required(),
  //     });
  //     return schemaEmail.validate(user);
  // }else{
  //     const schemaUsername = Joi.object({
  //         username: Joi.string().min(2).required(),
  //         password: Joi.string().min(6).required(),
  //     });
  //     return schemaUsername.validate(user)
  // }
};

/**
 * @description Function to find if user exists for login
 * @param {UserController} input A UserController object
 * @returns {UserController} A UserController object
 */
const findUser = async (input) => {
  if (input.email) {
    const user = await User.findOne({ where: { email: input.email } });
    return user;
  } else {
    const user = await User.findOne({ where: { username: input.username } });
    return user;
  }
};

/**
 * @description Function to check entered registration information
 * @param {any} username Username of the user
 * @param {any} email Email of the the user
 * @returns {boolean|string} Returns an error if
 * registration information entered already exists in the database,
 * if username already exists in the database, or if email already exists in the database.
 */
const userExistCheck = async (username, email) => {
  const usernameExist = await User.findOne({ where: { username: username } });
  const emailExist = await User.findOne({ where: { email: email } });

  if (usernameExist && emailExist) {
    return { success: true, msg: "You are already registered " };
  } else if (usernameExist) {
    return { success: true, msg: "Username is already taken" };
  } else if (emailExist) {
    return { success: true, msg: "Email is already registered" };
  } else {
    return { success: false, msg: "" };
  }
};

/**
 * @description Function to issue token to user if logged in
 * @param {UserController} user UserController object
 * @param {UserController} userToLogin UserController object
 * @returns {boolean|string} Returns an error if password entered for
 * login is not in database, a token otherwise.
 */
const issueToken = async (user, userToLogin) => {
  const validPass = await bcrypt.compare(userToLogin.password, user.password);
  console.log(validPass);
  if (!validPass) return { success: false, message: "Invalid Password" };

   const token = await jwt.sign({ id: user.id }, "SECRET11");
  return { success: true, token: token };
};

module.exports.registerInputValidation = registerInputValidation;
module.exports.loginInputValidation = loginInputValidation;
module.exports.userExistCheck = userExistCheck;
module.exports.findUser = findUser;
module.exports.issueToken = issueToken;
