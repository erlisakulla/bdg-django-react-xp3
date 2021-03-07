const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { registerInputValidation,  loginInputValidation, findUser, issueToken } = require('../helpers/UserControllerHelper');
const bcrypt = require('bcrypt');

// Write controller
class UserController {
  async register(userToRegister) {
        const { username, email, password, isInstructor } = userToRegister;

        const { error } = registerInputValidation(userToRegister);
        if (error) return { status: 406, success: false, msg: `ERROR: ${error.details[0].message}` };

        // const userExist = await userExistCheck(username, email);
        // if (userExist.success) return { status: 406, success: false, msg: `Heyy: ${userExist.msg}` };

        const usernameExist = await User.findOne({where: { username: username }});
        try{
          if(usernameExist) return {msg:'yeah'};
          else return {msg: 'No'};
        }catch(e){
          return {msg: 'Err'};
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = { username: username, email: email, password: hashPassword,isInstructor: isInstructor };
        User.create(newUser)
        .then(data => {
          return {status: 201, success: true, msg: 'Successfully registered', data: data};
        })
        .catch(err => {
          return {status: 500, success: false, msg: `ERROR: ${err}`};
        });
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


  // async deleteUser(userToDelete) {
  //     try {
  //       const user = await User.findById(userToDelete._id);
  //       await User.deleteOne(user);
  //       return { status: 200, success: true, msg: `${user.username} was deleted` };
  //     } catch (error) {
  //       return { status: 400, success: false, msg: `User was not found`, error: error };
  //     }
  //   }
}

const userController = new UserController();
module.exports = userController;

