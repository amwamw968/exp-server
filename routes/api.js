const express = require('express');
const router = express.Router();
const userController = require('../controller/api/UserController');
const uploadController = require('../controller/api/UploadController');
const headers = require('../utils/headers');

const multer  = require('multer');
const upload = multer({ dest: './tmp/' });


console.log('enter route api');

router.post('/uploadsingle', upload.single('file'), uploadController.uploadSingleFile);

router.post('/uploadMultipart', upload.single('file'), uploadController.uploadMultipart);

router.use(headers.apptype);

/*user模块*/
router.post('/user/register', userController.userRegister);
router.get('/user/login', userController.userLogin);

router.use(headers.token);


router.get('/user/userinfo', userController.getUserInfo);
router.post('/user/uploadavatar', userController.userUploadAvatar);


module.exports = router;
