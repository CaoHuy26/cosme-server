const notificationRoute = require('express').Router();

const getNotificationsByUserId = require('./getNotificationsByUserId');
const createNotification = require('./createNotification');

notificationRoute.get('/:userId', getNotificationsByUserId);
notificationRoute.post('/', createNotification);

module.exports = notificationRoute;