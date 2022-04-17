const Router = require('koa-router');

/**
 * 从othersController取出对应函数
 * 函数：login
 */
 const {lostSearch_ctrl, findSearch_ctrl} = require('../controller/others.controller');


//创建路由router对象
const othersRouter = new Router({prefix: '/others'});


//设置数据传输格式，路径，参数
othersRouter.post('/lostSearch', lostSearch_ctrl);

othersRouter.post('/findSearch', findSearch_ctrl);


//导出othersRouter
module.exports = othersRouter;