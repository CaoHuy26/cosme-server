const redisClient = require('../../configs/redis');

module.exports = (req, res) => {
  const { userId } = req.params;
  const notificationKey = `notification:${userId}`;
  redisClient.lrange(notificationKey, 0, -1, (err, reply) => { // 0, -1: get all list
    if (err) {
      res.status(500).json({
        statusCode: 500,
        success: false,
        msg: `Error: ${err}`,
        data: null
      });
    }
    if (reply.length > 0) {
      return res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Get all notifications of ${userId}`,
        data: {
          user: userId,
          notifications: reply
        }
      });
    }
    return res.status(404).json({
      statusCode: 404,
      success: false,
      msg: 'Not found',
      data: null
    });
  });
};