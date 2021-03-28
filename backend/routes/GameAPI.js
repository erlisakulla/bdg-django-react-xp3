const express = require("express");
const router = express.Router();
const { createGame } = require("../controllers/GameController");
const { auth, authAdmin } = require("../middlewares/Auth");


// /game/ route


/**
 * Post request that routes to /game/ page
 */
router.post("", authAdmin, async (req, res) => {
  const mutedData = await createGame(req.body);
  res.status(mutedData.status?mutedData.status:400).send({hi:mutedData});

});



/**
 * Get game details routes to /game/gameid page
 */

router.get("/:game", async (req, res) => {
 // const mutedData = await createGame(req.body);
  res.send({game:req.params.game});
});


module.exports = router