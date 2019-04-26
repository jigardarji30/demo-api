const express = require('express');
const router = express.Router();

const productCont = require('../controller/productCOntroller');
const checkauth = require('../middleware/auth');

router.get('/view',productCont.viewproduct);
router.post('/add', productCont.addProduct);
router.get('/:productId', productCont.viewIdProduct);
router.patch('/:productId',productCont.updateProduct);
router.delete('/:productId', checkauth, productCont.deleteProduct);

console.log('product router');


module.exports = router;