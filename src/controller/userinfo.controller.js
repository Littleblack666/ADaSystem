const userInfoService = require('../service/userinfo.service');

class userInfoController {

    /**
     * 功能：根据微信标识获取用户信息
     * 返回值：数组
     */
    async checked(ctx, next) {
        const {id} = ctx.request.body;
        const result = await userInfoService.userInfoChecked(id);
        ctx.body = result;
    }


    /**
     * 功能：根据微信标识上传用户信息
     * 返回值：无
     */
    async uploaded(ctx, next) {
        const {id, schoolName, collage, studentId, phone} = ctx.request.body;
        const result = await userInfoService.userInfoUpload(id, schoolName, collage, studentId, phone);
        ctx.body = "用户信息上传成功！";
    }

}



module.exports = new userInfoController();