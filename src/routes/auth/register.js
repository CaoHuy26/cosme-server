const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const UserProfile = require('../../models/UserProfile');
const UserPhoto = require('../../models/UserPhoto');
const UserLog = require('../../models/UserLog');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (user) {
    res.status(200).json({
      statusCode: 500,
      success: false,
      msg: `${email} already in use`,
      user: null
    });
  }
  else {
    const newUser = await User.create({
      email,
      password,
    });
    
    const username = newUser.getDataValue('email').split("@")[0];
    await UserProfile.create({
      userId: newUser.getDataValue('id'),
      username
    });
    await UserPhoto.create({
      userId: newUser.getDataValue('id')
    });
    await UserLog.create({
      userId: newUser.getDataValue('id'),
      ipAddress: req.ipInfo.ip,
      action: 0 // register
    });

    // Generate token
    const payload = {
      user: newUser
    };
    const signedToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
    const token = 'Bearer ' + signedToken;
    res.status(200).json({
      statusCode: 200,
      success: true,
      msg: 'Register success',
      user: newUser,
      token
    });
  }
};