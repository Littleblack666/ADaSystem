const Router = require('koa-router');


/**
 * 从userinfoController取出对应参数
 * 参数：list, swUploadInfo, getSwPicture
 */
const { checked, uploaded
  } = require('../controller/userinfo.controller');


//文件路径前缀
const userInfoRouter = new Router({prefix: '/userinfo'});

/**
 * 数据传输格式，路径，参数
 */

userInfoRouter.post('/checked', checked);

userInfoRouter.post('/uploaded', uploaded)


//导出router
module.exports = userInfoRouter;
