const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerInputValidation = (user) => {
    const schema = Joi.object({
      username: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      isInstructor: Joi.bool()
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

const findUser = async (input) => {
    if (input.email) {
        const user = await User.findOne({where: { email: input.email }});
        return user;
    } else {  
        const user = await User.findOne({where: { username: input.username }});
        return user;
    }
};

const userExistCheck = async (username, email) => {
    const usernameExist = await User.findOne({where: { username: username }});
    const emailExist = await User.findOne({where: { email: email }});

    if (usernameExist && emailExist) {
        return { success: true, msg: 'You are already registered ' };
    } else if (usernameExist) {
        return { success: true, msg: 'Username is already taken' };
    } else if (emailExist) {
        return { success: true, msg: 'Email is already registered' };
    } else {
        return { success: false, msg: '' };
    }
};

const issueToken = async (user, userToLogin) => {
    const validPass = await bcrypt.compare(userToLogin.password, user.password);
    if (!validPass) return { success: false, message: 'Invalid Password' };

    const token = await jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return { success: true, token: token };
};

module.exports.registerInputValidation = registerInputValidation;
module.exports.loginInputValidation = loginInputValidation;
module.exports.userExistCheck = userExistCheck;
module.exports.findUser = findUser;
module.exports.issueToken = issueToken;
