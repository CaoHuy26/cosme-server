const userRouter = require('express').Router();

const getUsers = require('./getUsers');

userRouter.get('/users', getUsers);

module.exports = userRouter;