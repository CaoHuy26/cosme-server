const router = require('express').Router();
const bodyParser = require('body-parser');

const authRouter = require('./auth');
const productRouter = require('./product');

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/auth', authRouter);
router.use('/p', productRouter);

module.exports = router;