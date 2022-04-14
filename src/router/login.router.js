const Router = require('koa-router');

/**
 * 从loginController取出对应函数
 * 函数：login
 */
 const {login} = require('../controller/login.controller');


//创建路由router对象
const loginRouter = new Router();


//设置数据传输格式，路径，参数
loginRouter.get('/login', login);


//导出loginRouter
module.exports = loginRouter;