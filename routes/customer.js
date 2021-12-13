const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/customer');
const auth = require('../middleware/auth');
const customerAuth = require('../middleware/customerAuth');

router.post('/signUp/', ctrl.signUp);
router.post('/login/', ctrl.login);
router.put('/modify/:id', customerAuth, ctrl.modify);
router.put('/delete/:id', auth, ctrl.delete);
router.put('/isDisabled/:id', auth, ctrl.isDisabled);
router.delete('/deleteHard/:id', auth, ctrl.deleteHard);
router.get('/getOne/:id', customerAuth, ctrl.getOne);
router.get('/getAll', auth ,ctrl.getAll);
router.get('/getVeryAll', auth , ctrl.getVeryAll);




module.exports = router;