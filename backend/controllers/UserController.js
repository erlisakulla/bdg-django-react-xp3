const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { registerInputValidation, userExistCheck, loginInputValidation, findUser, issueToken } = require('../helpers/UserControllerHelper');
const bcrypt = require('bcryptjs');

// Write controller
class UserController {
  async register(userToRegister) {
        const { username, email, password } = userToRegister;

        const { error } = registerInputValidation(userToRegister);
        if (error) return { status: 406, success: false, msg: `ERROR: ${error.details[0].message}` };

        const userExist = await userExistCheck(username, email);
        if (userExist.sucsess) return { status: 406, success: false, msg: `ERROR: ${userExist.msg}` };

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username: username, email: email, password: hashPassword });
        try {
        await newUser.save();
        return { status: 200, success: true, msg: `${newUser.username} was registered.` };
        } catch (error) {
        return { status: 400, success: false, msg: `ERROR: ${error}` };
        }
  }

  async login(userToLogin) {
    // identifier can be username or email
    
    const validatedInput = loginInputValidation(userToLogin);
    const { error } = validatedInput.validatedInput;
    if (error) return {status: 401, success: false, msg: error.details[0].message};

    const user = await findUser(userToLogin);
    if (!user) return { status: 401, success: false, msg: 'We dont know this user! Do you want to register?' };

    const token = await issueToken(user, userToLogin);
    return { token: token, status: 200, success: true, msg: 'login' };
  }

  async changeBanStatus(userToBan) {
    try {
      const user = await User.findById(userToBan._id);
      user.isBanned = user.isBanned ? false : true;
      await user.save();
      return { status: 200, success: true, msg: `${user.username} banned status was changed to ${user.isBanned}` };
    } catch (error) {
      return { status: 400, success: false, msg: `User was not found`, error: error };
    }
  }

  async deleteUser(userToDelete) {
    try {
      const user = await User.findById(userToDelete._id);
      await User.deleteOne(user);
      return { status: 200, success: true, msg: `${user.username} was deleted` };
    } catch (error) {
      return { status: 400, success: false, msg: `User was not found`, error: error };
    }
  }
}

const userController = new UserController();
module.exports = userController;

