const swService = require('../service/sw.service');
const fs = require('fs');

const { SW_PICTURE_PATH } = require('../constants/file-path');

class SwController {

    /**
     * 功能：获取失物表信息
     * 
     */
    async list(ctx, next) {
        const result = await swService.getSwList();
        ctx.body = result;
    }


    /**
     * 功能：上传失物表信息
     */
    async swUploadInfo(ctx, next) {
        const {userInfo, thingName, address, tips, phone} = ctx.query;
        const result = await swService.swUploadInfo(userInfo, thingName, address, tips, phone);
        console.log(result);
        const insertId = result.insertId;
        const files = ctx.req.files;
        for (let file of files) {
          const { mimetype, filename, size } = file;
          await swService.createPicture( mimetype, filename, size, insertId );
        }
        ctx.body = '上传成功';
    }

    /**
     * 功能：上传失物表图片
     */
    async getSwPicture(ctx, next) {
        let { filename } = ctx.params;
        console.log(filename);
        const fileInfo = await swService.getSwImgInfo(filename);
        console.log(fileInfo);
        ctx.response.set('content-type', fileInfo.mimetype);
        ctx.body = fs.createReadStream(`${SW_PICTURE_PATH}/${filename}`);
    }
}



module.exports = new SwController();