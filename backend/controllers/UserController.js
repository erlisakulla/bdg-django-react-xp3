/**
 * Import the required modules for UserController.js
 */
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const {
  registerInputValidation,
  userExistCheck,
  loginInputValidation,
  findUser,
  issueToken,
} = require("../helpers/UserControllerHelper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Class to create a user, with methods to autheticate login and registration.
 * Relevant methods for register() and login(): registerInputValidation(), userExistCheck(), loginInputValidation(),
 * findUser(), issueToken().
 * @property {any} username
 * @property {any} email
 * @property {any} password
 * @property {any} isInstructor
 */
class UserController {
  /**
   * @description Function to register a user
   * @param {UserController} userToRegister This method is used for user registration
   * @returns {number| boolean| string}
   */
  async register(userToRegister) {
    const { username, email, password, isInstructor } = userToRegister;
    const { error } = registerInputValidation(userToRegister);
    if (error)
      return {
        status: 406,
        success: false,
        msg: `ERROR: ${error.details[0].message}`,
      };

    const userExist = await userExistCheck(username, email);
    if (userExist.success)
      return { status: 406, success: false, msg: `ERROR: ${userExist.msg}` };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username: username,
      email: email,
      password: hashPassword,
      isInstructor: isInstructor,
    };
    try {
      const entity = await User.create(newUser);
      return {
        status: 201,
        success: true,
        msg: "Successfully registered! Redirecting to Login Page",
        entity: entity,
      };
    } catch (err) {
      return { status: 500, success: false, msg: `ERROR: ${err}` };
    }
  }

  // async login(userToLogin) {
  //     // identifier can be username or email

  //     const {error} = loginInputValidation(userToLogin);
  //     if (error) return {status: 401, success: false, msg: error.details[0].message};

  //     const user = await findUser(userToLogin);
  //     //user does not exist in the db
  //     if (!user) return { status: 401, success: false, msg: 'Wrong username/password' };
  //     else{
  //       bcrypt.compare(userToLogin.password,user.password, (err, res)=>{
  //         console.log("hab");
  //         console.log(res);
  //         if(res){
  //           console.log("bii");
  //           const id = user.id;
  //           const token = jwt.sign({id},process.env.TOKEN_SECRET, {
  //             expiresIn: 300,
  //           });
  //           console.log(token);
  //           return {status: 200, success:true, token: token, user: user, msg: "Successfully signed in!"};
  //         }else{
  //           return {status: 401, success:false, msg: `${error}`};
  //         }
  //       });
  //     }
  // }
  /**
   * @description Function to login a user
   * @param {UserController} userToLogin This method is used
   * @returns {number| boolean| string}
   */
  async login(userToLogin) {
    // identifier can be username or email

    const validatedInput = loginInputValidation(userToLogin);
    const { error } = validatedInput.validatedInput;
    if (error)
      return { status: 401, success: false, msg: error.details[0].message };

    const user = await findUser(userToLogin);
    if (!user)
      return {
        status: 401,
        success: false,
        msg: "User not registered! Do you want to register?",
      };

    const token = await issueToken(user, userToLogin);
    if (token.token) {
      return {
        token: token.token,
        status: 200,
        success: true,
        msg: "Successfully logged in!",
        user: user,
      };
    } else {
      return { status: 401, success: false, msg: "token.message" };
    }
  }
}

const userController = new UserController();
module.exports = userController;
