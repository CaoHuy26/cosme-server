const jwt = require('jsonwebtoken');
const User = require('../../models/User');

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
      susscess: false,
      message: `${email} already in use`
    });
  }
  else {
    const newUser = await User.create({
      email,
      password,
    });
    // Generate token
    const payload = {
      user: newUser
    };
    const signedToken = jwt.sign(payload, 'jwt_secret_asdasd');
    const token = 'Bearer ' + signedToken;
    res.status(200).json({
      statusCode: 200,
      susscess: true,
      msg: 'Create user sucess',
      user: newUser,
      token
    });
  }
};