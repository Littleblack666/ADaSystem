const swService = require('../service/sw.service');
const fs = require('fs');

const { SW_PICTURE_PATH } = require('../constants/file-path');

class SwController {
    async list(ctx, next) {
        const result = await swService.getSwList();
        ctx.body = result;
    }

    async swUploadInfo(ctx, next) {
        const {userInfo, thingName, address, tips, phone} = ctx.query;
        const result = await swService.swUploadInfo(userInfo, thingName, address, tips, phone);
        const insertId = result.insertId;
        const files = ctx.req.files;
        for (let file of files) {
          const { mimetype, filename, size } = file;
          await swService.createPicture( mimetype, filename, size, insertId );
        }
        ctx.body = '上传成功'
    }

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