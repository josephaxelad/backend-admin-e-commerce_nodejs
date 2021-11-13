const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/product');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.delete('/deleteHard/:id', auth, ctrl.deleteHard);
router.get('/getOne/:id', auth, ctrl.getOne);
router.get('/getAll',ctrl.getAll);
router.get('/getVeryAll', auth ,ctrl.getVeryAll);
router.post('/create/', auth, multer ,ctrl.create);
router.put('/modify/:id', auth, multer, ctrl.modify);
router.put('/delete/:id', auth, ctrl.delete);
router.put('/isHidden/:id', auth, ctrl.isHidden);
router.put('/isVisible/:id', auth, ctrl.isVisible);



module.exports = router;
