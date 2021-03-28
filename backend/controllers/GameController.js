const db = require("../models");
const {gameCreationValidation} = require("../helpers/GameControllerHelper");

const Game = db.game;
const Op = db.Sequelize.Op;

class GameController {

  async createGame(newgame) {
    const { error } = gameCreationValidation(newgame);
    if (error)
      return {
        status: 406,
        success: false,
        msg: `ERROR: ${error.details[0].message}`,
      };

    try {
      const entity = await Game.create(newgame);
      return {
        status: 201,
        success: true,
        msg: "Successfully Created",
        entity: entity,
      };
    } catch (err) {
      return { status: 500, success: false, msg: `ERROR: ${err}` };
    }
  };

}




module.exports = new GameController()