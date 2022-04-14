const Router = require('koa-router');


/**
 * 从controller取出对应参数
 * 参数：list, swUploadInfo, getSwPicture
 */
const { list,
    swUploadInfo,
    getSwPicture
  } = require('../controller/sw.controller');

  //失物图片的中间操作
  const {swPictureHandle}  = require('../middleware/file.middleware')


  //文件路径前缀
const swRouter = new Router({prefix: '/sw'});

/**
 * 数据传输格式，路径，参数
 */

swRouter.get('/list', list);

swRouter.post('/upload', swPictureHandle, swUploadInfo)

swRouter.get('/images/:filename', getSwPicture);


//导出router
module.exports = swRouter;
