const Router = require('koa-router');

const { list,
    swUploadInfo,
    getSwPicture
  } = require('../controller/sw.controller');

  const {swPictureHandle}  = require('../middleware/file.middleware')

const swRouter = new Router({prefix: '/sw'});


swRouter.get('/list', list);

swRouter.post('/upload', swPictureHandle, swUploadInfo)

swRouter.get('/images/:filename', getSwPicture);


module.exports = swRouter;
