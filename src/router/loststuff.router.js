const Router = require('koa-router');


/**
 * 从controller取出对应参数
 * 参数：getLostInfo_ctrl, uploadLostInfo_ctrl, getLostImg
 */
const { getLostInfo_ctrl,
    uploadLostInfo_ctrl,
    getLostImg
  } = require('../controller/loststuff.controller');

  //失物图片的中间操作
  const {lostStuffImgHandle}  = require('../middleware/file.middleware')


  //文件路径前缀
const lostStuffRouter = new Router({prefix: '/loststuff'});

/**
 * 数据传输格式，路径，参数
 */

lostStuffRouter.get('/getLostInfo', getLostInfo_ctrl);

lostStuffRouter.post('/uploadLostInfo', lostStuffImgHandle, uploadLostInfo_ctrl);

lostStuffRouter.get('/images/:filename', getLostImg);


//导出router
module.exports = lostStuffRouter;
