const express = require("express");
const router = express.Router();
const { createGame } = require();

router.post("/game", async (req, res) => {
  const mutedData = await createGame(req.body);
  res.send(mutedData);
});
