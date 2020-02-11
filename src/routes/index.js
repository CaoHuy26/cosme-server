const router = require('express').Router();
const bodyParser = require('body-parser');

const authRouter = require('./auth');

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/auth', authRouter);

module.exports = router;