const express = require('express');
const router = express.Router();
const userCont = require('../controller/userController');
const checkauth = require('../middleware/auth');

// router.get('/view',userCont.viewUser);
router.post('/signup', userCont.addUser);
router.post('/addmulti', userCont.add);
router.post('/generatesecret',userCont.generatesecret);
router.post('/generateotp',userCont.generateotp);
router.post('/validateotp',userCont.validateotp);


router.post('/loginUser', userCont.loginUser);
router.delete('/:userId', checkauth,userCont.deleteUser);

router.get('/finduser',userCont.finduser);
router.get('/findproduct',userCont.findproduct);
router.get('/findorder',userCont.findorder);


console.log('User router');

module.exports = router;