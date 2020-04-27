const User = require('../../models/User');
const UserPhoto = require('../../models/UserPhoto');
const UserProfile = require('../../models/UserProfile');
const UserLog = require('../../models/UserLog');
const Order = require('../../models/Order');
const ProductRating = require('../../models/ProductRating');
const ProductReview = require('../../models/ProductReview');

module.exports = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      await Promise.all([
        UserPhoto.destroy({
          where: {
            userId
          }
        }),
        UserProfile.destroy({
          where: {
            userId
          }
        }),
        UserLog.destroy({
          where: {
            userId
          }
        }),
        User.destroy({
          where: {
            id: userId
          }
        })
      ]);
     
      await Promise.all([
        Order.update({
          userId: '00000000' // id of unknown user
        }, {
          where: {
            userId
          }
        }),
        ProductRating.update({
          userId: '00000000'
        }, {
          where: {
            userId
          }
        }),
        ProductReview.update({
          userId: '00000000'
        }, {
          where: {
            userId
          }
        })
      ]);

      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Delete all data of user ${userId}`
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