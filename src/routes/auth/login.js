const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err || !user) {
      // .status(400)
      return res.json({
        statusCode: 400,
        success: false,
        msg: info.message,
        user: null
      })
    }
    req.login(user, {session: false}, err => {
      if (err) {
        res.send(err);
      }
      const payload = {
        user: req.user
      };
      const signedToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN);
      const token = 'Bearer ' + signedToken;
      // const decoded = jwt.decode(token, {complete: true})
      // console.log(decoded);
      
      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: 'Login success',
        user: req.user,
        token
      })
    });
  })(req, res)
};