const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');


router.delete('/deleteHard/:id', auth, adminCtrl.deleteHard);
router.get('/getOne/:id', auth, adminCtrl.getOne);
router.get('/getAll', auth ,adminCtrl.getAll);
router.get('/getVeryAll', auth,  adminCtrl.getVeryAll);
router.post('/create/', auth, adminCtrl.create);
router.post('/login', adminCtrl.login);
router.put('/modify/:id', auth, adminCtrl.modify);
router.put('/modifyRole/:id', auth, adminCtrl.modifyRole);
router.put('/delete/:id', auth, adminCtrl.delete);



module.exports = router;