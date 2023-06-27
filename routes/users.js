var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));


router.get('/', userCtrl.getUserView)

router.post('/deleteUser', userCtrl.deleteUser);
router.post('/searchUser', userCtrl.searchUser);
router.post('/reload', userCtrl.reloadUser);



router.post('/signup', userCtrl.signUp);
module.exports = router;










