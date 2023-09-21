const Router = require('express');
const router = new Router();
const objectRouter = require('./object');
const catalogRouter = require('./catalog');

router.use('/object', objectRouter);
router.use('/catalog', catalogRouter);

module.exports = router;