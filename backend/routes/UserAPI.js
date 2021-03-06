const { auth, authAdmin, test } = require('../middlewares/Auth');
const express = require('express');
const router = express.Router();
const { register, login, changeBanStatus, deleteUser } = require('../controllers/UserController');

router.post('/register', async (req, res) => {
  const mutedData = await register(req.body);
  res.status(mutedData.status).send(mutedData);
});
router.post('/login', async (req, res) => {
  const mutedData = await login(req.body)
  res.status(mutedData.status).send(mutedData);
});

router.post('/ban', async (req, res) => {
  const mutedData = await changeBanStatus(req.body);
  res.status(mutedData.status).send(mutedData);
});

router.delete('/', async (req, res) => {
  const mutedData = await deleteUser(req.body);
  res.status(mutedData.status).send(mutedData);
});

router.post('/exampleadmin', authAdmin, async (req, res) => {
  res.send(req.user);
});
router.post('/example', auth, async (req, res) => {
  res.send(req.user);
});

router.get('/hello', async (req, res) => {
  res.send('here is your backend');
});
module.exports = router;
