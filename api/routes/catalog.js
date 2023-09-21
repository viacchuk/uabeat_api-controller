const Router = require('express');
const router = new Router();
const catalogController = require('../controllers/catalogController');

router.post('/', catalogController.get);
router.post('/pages', catalogController.pages);

module.exports = router;