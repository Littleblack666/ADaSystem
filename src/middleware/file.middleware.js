const Multer = require('koa-multer');
const { AVATAR_PATH,
        PICTURE_PATH,
        FOOD_PICTURE_PATH,
        SW_PICTURE_PATH,
        LOST_IMG_PATH,
        FIND_IMG_PATH

} = require('../constants/file-path');
const jimp = require('jimp');
const path = require('path');

const avatarUpload = Multer({
  dest: AVATAR_PATH
});

const avatarHandle = avatarUpload.single('avatar');

const pictureUpload = Multer({
  dest: PICTURE_PATH
});

const pictureHandle = pictureUpload.array('picture', 9);

const foodPictureUpload = Multer({
  dest: FOOD_PICTURE_PATH
});

const foodPictureHandle = foodPictureUpload.array('food', 9);


const swPictureUpload = Multer({
  dest: SW_PICTURE_PATH
});

const swPictureHandle = swPictureUpload.array('sw', 9);

//失物图片路径的配置
const lostImgUpload = Multer({
  dest: LOST_IMG_PATH
});

const lostStuffImgHandle = lostImgUpload.array('loststuff', 9);

//寻物图片路径的配置
const findImgUpload = Multer({
  dest: FIND_IMG_PATH
});

const findStuffImgHandle = findImgUpload.array('findstuff', 9);


const pictureResize = async (ctx, next) => {
  const files = ctx.req.files;
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then(image => {
      image.resize(1280, jimp.AUTO).write(`${destPath}-large`);
      image.resize(640, jimp.AUTO).write(`${destPath}-middle`);
      image.resize(320, jimp.AUTO).write(`${destPath}-small`);
    });
    await next();
  }
}



module.exports = {avatarHandle ,pictureHandle, pictureResize, foodPictureHandle, swPictureHandle,
  lostStuffImgHandle, findStuffImgHandle};