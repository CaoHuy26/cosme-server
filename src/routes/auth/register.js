const User = require('../../models/User');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email
    }
  });
  if (user) {
    res.status(500).json({
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
    res.status(200).json({
      statusCode: 200,
      susscess: true,
      newUser
    });
  }
};