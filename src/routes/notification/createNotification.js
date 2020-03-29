const redisClient = require('../../configs/redis');

module.exports = (req, res) => {
  const { userId, time } = req.body;
  const notificationKey = `notification:${userId}`;
  const notification = `${time}: ${req.body.notification}`;
  redisClient.lpush(notificationKey, notification); // Left push
  redisClient.lrange(notificationKey, 0, -1, (err, reply) => {
    if (err) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        msg: `Error: ${err}`,
        data: null
      });
    }
    return res.status(200).json({
      statusCode: 200,
      success: true,
      msg: `Create notification success`,
      data: {
        user: userId,
        notification,
        notifications: reply
      }
    });
  });
};