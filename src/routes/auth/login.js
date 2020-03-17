const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        msg: 'Login fail',
        info
      })
    }
    req.login(user, {session: false}, err => {
      if (err) {
        res.send(err);
      }
      const payload = {
        user: req.user
      };
      const signedToken = jwt.sign(payload, 'jwt_secret_asdasd');
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