const router = require('express').Router();
const product = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, product.create);
router.get('/', auth, product.getAll);
router.get('/:id', auth, product.getById);
router.put('/:id', auth, product.update);
router.delete('/:id', auth, product.remove);

module.exports = router;
