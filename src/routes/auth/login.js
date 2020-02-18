const User = require('../../models/User');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (!user) {
    res.status(200).json({
      statusCode: 500,
      success: false,
      message: `User ${email} is not exist`
    });
  }
  else {
    if (user.password !== password) {
      res.status(200).json({
        statusCode: 500,
        success: false,
        message: `Password is does not match for user ${user.email}`
      });
    }
    else {
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: 'Login success',
        user: req.body
      });
    }
  }
};