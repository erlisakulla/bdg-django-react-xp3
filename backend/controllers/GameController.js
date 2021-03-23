const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

class GameController {
  async createGame(newgame) {
    const { id, password } = newgame;
  }
}
