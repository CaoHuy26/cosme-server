const userRouter = require('express').Router();

const getUsers = require('./getUsers');
const updateUserProfile = require('./updateUserProfile');
const banUser = require('./banUser');
const unbanUser = require('./unbanUser');

userRouter.get('/users', getUsers);
userRouter.put('/:userId', updateUserProfile);

userRouter.put('/ban/:userId', banUser);
userRouter.put('/unban/:userId', unbanUser);

module.exports = userRouter;