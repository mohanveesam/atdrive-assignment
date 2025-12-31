const router = require('express').Router();
const order = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, order.createOrder);
router.get('/user/:userId', auth, order.getOrdersByUser);
// router.get('/:id', auth, order.getOrdersByUser);
router.put('/:id', auth, order.updateOrder);
router.delete('/:id', auth, order.deleteOrder);

module.exports = router;
