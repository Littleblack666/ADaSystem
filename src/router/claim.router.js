const Router = require('koa-router');


/**
 * 从controller取出对应参数
 * 参数：lostClaim_ctrl, findClaim_ctrl
 */
const { lostClaim_ctrl, findClaim_ctrl
  } = require('../controller/claim.controller');



//文件路径前缀
const claimRouter = new Router({prefix: '/claim'});

/**
 * 数据传输格式，路径，参数
 */

 claimRouter.post('/lostClaim', lostClaim_ctrl);

 claimRouter.post('/findClaim', findClaim_ctrl);



//导出router
module.exports = claimRouter;
