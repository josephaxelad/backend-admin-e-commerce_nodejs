const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/category');
const auth = require('../middleware/auth');

router.delete('/deleteHard/:id', auth, ctrl.deleteHard);
router.get('/getOne/:id', auth, ctrl.getOne);
router.get('/getAll', auth ,ctrl.getAll);
router.get('/getVeryAll', auth,  ctrl.getVeryAll);
router.post('/create/', auth, ctrl.create);
router.put('/modify/:id', auth, ctrl.modify);
router.put('/delete/:id', auth, ctrl.delete);



module.exports = router;
