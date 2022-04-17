const searchService = require('../service/others.service');//导入others.service信息

class othersController {

    /**
     * 功能：根据获得的失物字段进行模糊查询
     * 参数：title
     * 返回：数组
     * @returns 
     */
    async lostSearch_ctrl(ctx, next) {
        const {title} = ctx.request.body;
        const result = await searchService.lostSearch(title);
        ctx.body = result;
    }

    /**
     * 功能：根据获得的寻物字段进行模糊查询
     * 参数：title
     * 返回：数组
     * @returns 
     */
     async findSearch_ctrl(ctx, next) {
        const {title} = ctx.request.body;
        const result = await searchService.findSearch(title);
        ctx.body = result;
    }

}


//导出othersController
module.exports = new othersController();