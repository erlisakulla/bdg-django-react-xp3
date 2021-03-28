/**
 * Import the required modules for UserControllerHelper.js
 */
const db = require("../models");
const Game = db.game;
const Op = db.Sequelize.Op;
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { valid } = require("joi");

/**
 * @description Function to check format of entered registration information
 * @param {GameController} game A GameController object
 * @returns {Joi.ObjectSchema<any>} Returns an
 * error if entered registration information is incorrect
 */
const gameCreationValidation = (game) => {
  const schema = Joi.object({

    username: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    isInstructor: Joi.bool(),

  });
  return schema.validate(game);
};


module.exports.gameCreationValidation= gameCreationValidation; 