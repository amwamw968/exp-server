const jwt = require('jsonwebtoken'); // 使用jwt签名
const constant = require('./constant');
const config = require('../dbhelper/config');

function apptype(req, res, next) {
  let type = req.headers['app-type'];
  console.log(type);
  if (type === 'wx-app') {
    next();
  }
  else if (typeof(type) === 'undefined'){
    res.json({
      code: constant.RESULT_CODE.ARG_ERROR.code,
      msg: 'app-type不能为空'
    });
    res.status(401);
  }
  else {
    res.json({
      code: constant.RESULT_CODE.ARG_ERROR.code,
      msg: 'app-type值错误'           
    });
    res.status(401);
  }
}

function token(req, res, next) {
  // 拿取token 数据 按照自己传递方式写
  let token = req.headers['access-token'];
  console.log('token');
  console.log(token);
  if (token) {
    jwt.verify(token, config.jwtsecret, (err, decoded) => {
      if (err) {
        console.log('err' + err);
        res.json({
          code: constant.RESULT_CODE.TOKEN_ERR.code,
          msg: constant.RESULT_CODE.TOKEN_ERR.msg,
        });
      } else {
        req.decoded = decoded;
        console.log('decoded: ');
        console.log(decoded);
        next();//继续下一步路由

      }
    });
  } else {
    res.json({
      code: constant.RESULT_CODE.TOKEN_NO_FIND.code,
      msg: constant.RESULT_CODE.TOKEN_NO_FIND.msg,
    });
  }
}

exports.apptype = apptype;
exports.token = token;