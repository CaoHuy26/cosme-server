const router = require('express').Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('../configs/passport');
const authRouter = require('./auth');
const productRouter = require('./product');
const orderRouter = require('./order');
const notificationRouter = require('./notification');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
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
router.use('/notification', notificationRouter);

module.exports = router;