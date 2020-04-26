const User = require('../../models/User');

module.exports = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    
    if (user) {
      await user.update({
        active: true
      });

      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Unban user ${userId} success`
      });
    }
    else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        msg: `Not found: ${userId}`
      });
    }
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      msg: `Error ${err}`
    });
  }
};