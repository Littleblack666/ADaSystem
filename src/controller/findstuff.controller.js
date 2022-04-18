const findStuffService = require('../service/findstuff.service');
const fs = require('fs');//文件流配置

const { FIND_IMG_PATH } = require('../constants/file-path');

class findStuffController {

    /**
     * 功能：获取所有寻物表信息
     * 
     */
    async getFindInfo_ctrl(ctx, next) {
        const result = await findStuffService.getFindInfo();
        ctx.body = result;
    }


    /**
     * 功能：获取该用户id下的寻物表信息
     * 
     */
     async getMyFindInfo_ctrl(ctx, next) {
        const {id} = ctx.request.body;
        const result = await findStuffService.getMyFindInfo(id);
        ctx.body = result;
    }


    /**
     * 功能：改变寻物启事状态：0为未寻回，1为寻回
     * 参数：num, id
     * 返回：字符串, 数组
     */
     async changeFindState_ctrl(ctx, next) {
        const {num, id, id2} = ctx.request.body;
        const result = await findStuffService.changeFindState(Number(num), id, id2);
        ctx.body = "该失物寻回成功！";
        // ctx.body = result;
    }



    /**
     * 功能：上传寻物表信息以及图片字段
     */
    async uploadFindInfo_ctrl(ctx, next) {
        const {id, title, address, phone, message, state} = ctx.query;
        const result = await findStuffService.uploadFindInfo(id, title, address, phone, message, Number(state));
        // console.log(result);
        const findId = result.insertId;//获取特殊字段进行赋值
        const files = ctx.req.files;//post请求文件输出流
        for (let file of files) {
            // console.log(file);
            const {filename, mimetype, size} = file;
            // console.log(filename, mimetype, size);
            await findStuffService.createImgPath(filename, mimetype, size, findId);
        }
        ctx.body = '寻物启事上传成功！';
    }

    /**
     * 功能：通过字段获取图片并输出
     */
    async getFindImg(ctx, next) {
        let {filename} = ctx.params;
        // console.log(filename);
        const fileInfo = await findStuffService.getFindImgInfo(filename);
        // console.log(fileInfo);
        ctx.response.set('content-type', fileInfo.type);
        ctx.body = fs.createReadStream(`${FIND_IMG_PATH}/${filename}`);
    }
}



module.exports = new findStuffController();