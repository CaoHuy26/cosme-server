const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Hàm được gọi khi xác thực thành công để lưu thông tin user vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Hàm được gọi bởi passport.session
// Giúp  lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user
passport.deserializeUser((user, done) => {
  User.findByPk(user.id).then(user => {
    done(null, user);
  }).catch(err => {
    console.log(err);
  });
});

passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) {
        return done(null, false, {
          message: 'Incorrect email'
        });
      }
      if (user.getDataValue('password') !== password) {
        return done(null, false, {
          message: 'Incorrect password'
        });
      }

      return done(null, user, {
        message: 'Login success'
      });
    }
    catch (err) {
      return done(err);
    }
  }
));

let jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = 'jwt_secret_asdasd';

passport.use(new JwtStrategy(jwtOpts, async (jwt_payload, done) => {
    try {
      console.log(`jwt_payload: ${JSON.stringify(jwt_payload, null, 4)}`);
      const { id } = jwt_payload.user;
      const user = await User.findOne({
        where: {
          id
        }
      });
      if (!user) {
        return done(null, false);
      }
      else {
        return done(null, user);
      }
    }
    catch (err) {
      return done(err);
    }
  }
));