var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.controller');


/* GET home page. */
router.get('/', productCtrl.getProductsView);
router.get('/group', productCtrl.getGroupView);






const multer = require('multer');
var uploader = multer({dest:'./tmp'});

router.post('/post', uploader.single('productImage'), productCtrl.postProduct);
router.post('/update', uploader.single('productImage'), productCtrl.editProduct);
router.post('/delete', productCtrl.deleteProduct);
router.post('/postGroup', productCtrl.postGroup);
router.post('/updateGroup', productCtrl.updateGroup);
router.post('/deleteGroup', productCtrl.deleteGroup);
router.get('/:idProduct', productCtrl.productInfo);
router.post('/filter', productCtrl.filterProduct);




module.exports = router;



