const express = require('express');
const router = express.Router();
const ordercont = require('../controller/orderController');

router.get('/view',ordercont.viewOrder);
router.post('/add',ordercont.addOrder);
router.get('/:orderId',ordercont.viewIdOrder);
router.patch('/:orderId',ordercont.updateOrder);
router.delete('/:orderId',ordercont.deleteOrder);

console.log('order router');

module.exports = router;