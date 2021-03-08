const { auth, authAdmin} = require('../middlewares/Auth');
const express = require('express');
const router = express.Router();
const { register, login} = require('../controllers/UserController');

router.post('/signup', async (req, res) => {
  const mutedData = await register(req.body);
  res.send(mutedData);
});

router.post('/login', async (req, res) => {
  const mutedData = await login(req.body);
  res.send(mutedData);
});


// router.get('/', async (req, res) => {
//   const mutedData = await deleteUser(req.body);
//   res.status(mutedData.status).send(mutedData);
// }); res.send(mutedData)

module.exports = router;
