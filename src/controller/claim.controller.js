const claimService = require('../service/claim.service');

class claimController {

    /**
     * 功能：查询用户已认领的失物信息
     * 参数：id
     * 返回：数组
     */
    async lostClaim_ctrl(ctx, next) {
        const {id} = ctx.request.body;
        const result = await claimService.lostClaim(id);
        ctx.body = result;
    }


    /**
     * 功能：查询用户已认领的寻物信息
     * 参数：id
     * 返回：数组
     */
     async findClaim_ctrl(ctx, next) {
        const {id} = ctx.request.body;
        const result = await claimService.findClaim(id);
        ctx.body = result;
    }

}



module.exports = new claimController();