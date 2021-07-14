const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
// const auth = require('../middleware/auth');


router.put('/modify/:id', adminCtrl.modify);
router.put('/modifyRole/:id', adminCtrl.modifyRole);
router.put('/delete/:id', adminCtrl.delete);
router.delete('/deleteHard/:id', adminCtrl.deleteHard);
router.post('/create/', adminCtrl.create);
router.get('/getOne/:id', adminCtrl.getOne);
router.get('/getAll',  adminCtrl.getAll);
router.get('/getVeryAll',  adminCtrl.getVeryAll);


module.exports = router;