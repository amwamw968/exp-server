const userInfo = require('../../model/userInfo');
const constant = require('../../utils/constant');
const co = require('co');
const oss = require('ali-oss');
const fs = require('fs');

async function asyncProcess (p, cpt, res) {
  console.log(p);
  console.log(cpt);
  console.log(res.headers['x-oss-request-id']);
}

class UploadController {

  constructor() {
  }

  async uploadSingleFile(req, res, next) {

    console.log('[uploadSingleFile]: ' + req.file.path);

    let accesskey = {};
    accesskey.region = {};
    accesskey.accessKeyId = {};
    accesskey.accessKeySecret = {};
    accesskey.endPoint = {};
    accesskey.bucket = {};

    let filename = './key';
    if (!fs.existsSync(filename)){
      console.log('[uploadSingleFile]: key文件不存在');

      res.json({
        code: constant.RESULT_CODE.UPLOAD_ERR.code,
        msg: '上传失败, 文件不存在'
      });
      return;
    }

    accesskey = JSON.parse(fs.readFileSync( filename));

    const store = oss({
      region: accesskey.region,
      accessKeyId: accesskey.accessKeyId,
      accessKeySecret: accesskey.accessKeySecret,
      bucket: accesskey.bucket,
      endPoint: accesskey.endPoint,
    });

    let localFile = './' + req.file.path; 
    let destFile = 'avatar/' + req.file.originalname; 
    console.log('[uploadSingleFile]: destFile:' + destFile);
    console.log('[uploadSingleFile]: localFile:' + localFile);

    let exists = fs.existsSync(localFile);
    if(!exists){
      console.log('[uploadSingleFile]: 文件不存在');
      res.json({
        code: constant.RESULT_CODE.UPLOAD_ERR.code,
        msg: '上传失败, 文件不存在'
      });
      return;
    }
  
    /* 阿里云 上传文件 */
    let result = await store.put(destFile, localFile)
      .catch((err)=>{
        console.log('[uploadSingleFile]: 阿里云 error');
        /* 上传之后删除本地文件 */  
        fs.unlinkSync(localFile);
        res.json({
          code: constant.RESULT_CODE.UPLOAD_ERR.code,
          msg: '上传失败',
          data: err
        });
        return;
      });

    let imageSrc = 'https://amwamw968-app.oss-cn-beijing.aliyuncs.com/' + result.name;
    /* 上传之后删除本地文件 */
    fs.unlinkSync(localFile);
    res.json({
      code: constant.RESULT_CODE.SUCCESS.code,
      msg: '上传成功',
      data: imageSrc
    });
  }
  
  
  async uploadMultipart(req, res, next) {

    console.log('[uploadMultipart]: ' + req.file.path);

    let accesskey = {};
    accesskey.region = {};
    accesskey.accessKeyId = {};
    accesskey.accessKeySecret = {};
    accesskey.endPoint = {};
    accesskey.bucket = {};

    let filename = './key';
    if (!fs.existsSync(filename)){
      console.log('[uploadMultipart]: key文件不存在');

      res.json({
        code: constant.RESULT_CODE.UPLOAD_ERR.code,
        msg: '上传失败, 文件不存在'
      });
      return;
    }

    accesskey = JSON.parse(fs.readFileSync( filename));

    const store = oss({
      region: accesskey.region,
      accessKeyId: accesskey.accessKeyId,
      accessKeySecret: accesskey.accessKeySecret,
      bucket: accesskey.bucket,
      endPoint: accesskey.endPoint,
    });

    let localFile = './' + req.file.path; 
    let destFile = 'avatar/' + req.file.originalname; 
    console.log('[uploadMultipart]: destFile:' + destFile);
    console.log('[uploadMultipart]: localFile:' + localFile);

    let exists = fs.existsSync(localFile);
    if(!exists){
      console.log('[uploadMultipart]: 文件不存在');
      res.json({
        code: constant.RESULT_CODE.UPLOAD_ERR.code,
        msg: '上传失败, 文件不存在'
      });
      return;
    }
  
    /* 阿里云 上传文件 */
    //let result = await store.put(destFile, localFile)
    let result =  store.multipartUpload(destFile, localFile, {
      parallel: 4,
      partSize: 2 * 1024 * 1024,
      progress: asyncProcess

    })
      .catch((err)=>{
        console.log('[uploadMultipart]: 阿里云 error');
        /* 上传之后删除本地文件 */  
        //fs.unlinkSync(localFile);
        res.json({
          code: constant.RESULT_CODE.UPLOAD_ERR.code,
          msg: '上传失败',
          data: err
        });
        return;
      });

    let imageSrc = 'https://amwamw968-app.oss-cn-beijing.aliyuncs.com/' + result.name;
    /* 上传之后删除本地文件 */
    //fs.unlinkSync(localFile);
    res.json({
      code: constant.RESULT_CODE.SUCCESS.code,
      msg: '上传成功',
      data: imageSrc
    });
  }
  
  
}


module.exports = new UploadController();
