const { auth, authAdmin, test } = require('../middlewares/Auth');
const express = require('express');
const router = express.Router();
const { register, login, changeBanStatus, deleteUser } = require('../controllers/UserController');

router.post('/signup', async (req, res) => {
  const mutedData = await register(req.body);
  // res.status(mutedData.status).send(mutedData);
  res.json(mutedData);
});

router.post('/login', async (req, res) => {
  const mutedData = await login(req.body)
  res.status(mutedData.status).send(mutedData);
});

// router.get('/signup', async (req, res) => {
//   res.json({ message: "Welcome to the game." });
// });

// router.get('/', async (req, res) => {
//   const mutedData = await deleteUser(req.body);
//   res.status(mutedData.status).send(mutedData);
// });

module.exports = router;
