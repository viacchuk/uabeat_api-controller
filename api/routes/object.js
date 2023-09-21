const Router = require('express');
const router = new Router();
const objectController = require('../controllers/objectController');

router.post('/', objectController.get);
router.post('/add', objectController.add);

module.exports = router;