const router = require('express').Router();
const bodyParser = require('body-parser');

const authRouter = require('./auth');
const productRouter = require('./product');
const orderRouter = require('./order');

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/auth', authRouter);
router.use('/p', productRouter);
router.use('/o', orderRouter);

module.exports = router;