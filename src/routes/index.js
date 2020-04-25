const router = require('express').Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const expressIp = require('express-ip');
require('../configs/passport');
const authRouter = require('./auth');
const productRouter = require('./product');
const orderRouter = require('./order');
const userRouter = require('./user');
const notificationRouter = require('./notification');
const searchRouter = require('./seach');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(expressIp().getIpInfoMiddleware);
router.use(session({
  secret: 'secretSession',
  saveUninitialized: true,
  resave: true
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use('/auth', authRouter);
router.use('/p', productRouter);
router.use('/o', orderRouter);
router.use('/u', userRouter);
router.use('/notification', notificationRouter);
router.use('/search', searchRouter);

module.exports = router;