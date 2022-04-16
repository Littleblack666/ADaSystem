const Router = require('koa-router');


/**
 * 从controller取出对应参数
 * 参数：getFindInfo_ctrl, uploadFindInfo_ctrl, getFindImg
 */
const { getFindInfo_ctrl,
    getMyFindInfo_ctrl,
    changeFindState_ctrl,
    uploadFindInfo_ctrl,
    getFindImg
  } = require('../controller/findstuff.controller');

  //失物图片的中间操作
  const {findStuffImgHandle}  = require('../middleware/file.middleware')


  //文件路径前缀
const findStuffRouter = new Router({prefix: '/findstuff'});

/**
 * 数据传输格式，路径，参数
 */

findStuffRouter.post('/getFindInfo', getFindInfo_ctrl);

findStuffRouter.post('/getMyFindInfo', getMyFindInfo_ctrl);

findStuffRouter.post('/changeFindState', changeFindState_ctrl);

findStuffRouter.post('/uploadFindInfo', findStuffImgHandle, uploadFindInfo_ctrl);

findStuffRouter.get('/images/:filename', getFindImg);


//导出router
module.exports = findStuffRouter;
