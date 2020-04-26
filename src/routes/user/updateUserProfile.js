const User = require('../../models/User');
const UserProfile = require('../../models/UserProfile');

module.exports = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    
    if (user) {
      const userProfile = await UserProfile.findOne({
        where: {
          userId
        }
      });
      await userProfile.update(req.body);

      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Update user profile ${userId} success`,
        profile: userProfile
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