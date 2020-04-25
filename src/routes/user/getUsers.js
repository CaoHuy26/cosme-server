const User = require('../../models/User');
const UserProfile =  require('../../models/UserProfile');
const UserPhoto = require('../../models/UserPhoto');

module.exports = async (req, res) => {
  try {
    const users = await UserProfile.findAll({
      raw: true,
      attributes: ['user.id', 'user.email', 'user.type', 'user.active', 'user.createdAt', 'username'],
      include: [
        {
          model: User,
          required: true,
          attributes: [],
          //TODO: Query user photo
          // include: [{
          //   model: UserPhoto,
          //   required: true
          // }]
        }
      ]
    });
    if (!users) {
      res.json({
        statusCode: 404,
        success: false,
        msg: 'Not found',
        users: null
      });
    }
    
    res.status(200).json({
      statusCode: 200,
      success: true,
      msg: 'Get all user success',
      users
    });
  } 
  catch (error) {
    // .status(500)
    res.json({
      statusCode: 500,
      success: false,
      msg: `Error: ${err}`,
      users: null
    });
  }
};