const authRouter = require('express').Router();
const User = require('../../models/User');

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user) {
    res.send(`Tai khoan ${email} khong ton tai`);
  } 
  else {
    if (user.password !== password) {
      res.send('Sai mat khau');
    }
    else {
      res.send('Dnag nhat thanh cong');
    }
  }
});

authRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const isUserExist = await User.findOne({
    where: {
      email
    }
  });
  if (isUserExist) {
    res.send(`Tai khoan ${email} da ton tai`);
  }
  else {
    const user = await User.create({
      email,
      password,
    });
    res.json(user);
  }
});

module.exports = authRouter;
