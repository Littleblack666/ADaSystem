const deleteService = require('../service/delete.service');//导入others.service信息

class deleteController {

    /**
     * 功能：失物信息的删除
     * 参数：num
     * 返回：字符串
     * @returns 
     */
    async lostDelete_ctrl(ctx, next) {
        const {num} = ctx.request.body;
        await deleteService.lostDelete(num);
        ctx.body = "已删除该失物信息！";
    }

    /**
     * 功能：寻物信息的删除
     * 参数：num
     * 返回：字符串
     * @returns 
     */
     async findDelete_ctrl(ctx, next) {
        const {num} = ctx.request.body;
        await deleteService.findDelete(num);
        ctx.body = "已删除该寻物信息！";
    }

    /**
     * 功能：用户信息的删除
     * 参数：id
     * 返回：字符串
     * @returns 
     */
     async userDelete_ctrl(ctx, next) {
        const {id} = ctx.request.body;
        await deleteService.userDelete(id);
        ctx.body = "已删除该用户信息！";
    }


}


//导出othersController
module.exports = new deleteController();