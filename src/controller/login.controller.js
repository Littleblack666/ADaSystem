const loginService = require('../service/login.service');//导入login.service信息

class loginController {

    /**
     * 功能：微信登录功能：微信信息的上传
     * 参数：id，name，headImageUrl
     * 返回值：一个string字符
     */
    async login(ctx, next) {
        const {id, name, headImageUrl} = ctx.request.body;
        const result = await loginService.wechatLogin(id, name, headImageUrl);
        ctx.body = result;
    }

}


//导出loginController
module.exports = new loginController();