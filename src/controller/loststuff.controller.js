const lostStuffService = require('../service/loststuff.service');
const fs = require('fs');//文件流配置

const { LOST_IMG_PATH } = require('../constants/file-path');

class lostStuffController {

    /**
     * 功能：获取所有失物表信息
     * 
     */
    async getLostInfo_ctrl(ctx, next) {
        const result = await lostStuffService.getLostInfo();
        ctx.body = result;
    }

    /**
     * 功能：获取该用户id下的失物信息
     * 
     */
     async getMyLostInfo_ctrl(ctx, next) {
        const {id} = ctx.request.body;
        const result = await lostStuffService.getMyLostInfo(id);
        ctx.body = result;
    }

    /**
     * 功能：改变失物招领状态：0为未招领，1为招领
     * 参数：num
     * 返回：字符串
     */
     async changeLostState_ctrl(ctx, next) {
        const {num} = ctx.request.body;
        const result = await lostStuffService.changeLostState(Number(num));
        ctx.body = "该失物招领成功！";
    }


    /**
     * 功能：上传失物表信息以及图片字段
     */
    async uploadLostInfo_ctrl(ctx, next) {
        const {id, title, address, phone, message, state} = ctx.query;
        const result = await lostStuffService.uploadLostInfo(id, title, address, phone, message, Number(state));
        // console.log(result);
        const lostId = result.insertId;//获取特殊字段进行赋值
        const files = ctx.req.files;//post请求文件输出流
        for (let file of files) {
            // console.log(file);
            const {filename, mimetype, size} = file;
            // console.log(filename, mimetype, size);
            await lostStuffService.createImgPath(filename, mimetype, size, lostId);
        }
        ctx.body = '失物招领上传成功！';
    }

    /**
     * 功能：通过字段获取图片并输出
     */
    async getLostImg(ctx, next) {
        let {filename} = ctx.params;
        // console.log(filename);
        const fileInfo = await lostStuffService.getLostImgInfo(filename);
        // console.log(fileInfo);
        ctx.response.set('content-type', fileInfo.type);
        ctx.body = fs.createReadStream(`${LOST_IMG_PATH}/${filename}`);
    }
}



module.exports = new lostStuffController();