const User = require('../../models/User');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({
    email,
    password,
  });
  res.status(200).json({
    statusCode: 200,
    susscess: true,
    user
  });
};