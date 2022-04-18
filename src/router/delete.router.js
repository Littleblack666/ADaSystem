const Router = require('koa-router');

/**
 * 从deleteController取出对应函数
 * 函数：lostDelete_ctrl, findDelete_ctrl
 */
 const {lostDelete_ctrl, findDelete_ctrl, userDelete_ctrl} = require('../controller/delete.controller');


//创建路由router对象
const deleteRouter = new Router({prefix: '/delete'});


//设置数据传输格式，路径，参数
deleteRouter.post('/lostDelete', lostDelete_ctrl);

deleteRouter.post('/findDelete', findDelete_ctrl);

deleteRouter.post('/userDelete', userDelete_ctrl);


//导出deleteRouter
module.exports = deleteRouter;