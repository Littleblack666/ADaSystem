const connection = require('../app/database');


/**
 * 失物表上传功能
 */
class SwService {
    
    /**
     * 功能：获取失物表信息
     * 参数：无
     * 返回：数组
     * @returns 
     */
    async getSwList() {
        const statement = `SELECT *,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/sw/images/', swimg.filename)) FROM swimg WHERE tb_thing.id = swimg.swId) AS image
        FROM tb_thing;`
      const [result] = await connection.execute(statement); 
        return result;
    }

    /**
     * 功能上传失物表信息
     * 参数：userInfo, thingName, address, tips, phone
     * 返回：数组
     * @returns 
     */
    async swUploadInfo(userInfo, thingName, address, tips, phone) {
        const statement = `INSERT INTO tb_thing (userInfo, thingName, address, tips, phone) VALUES(?,?,?,?,?);`
        const [result] = await connection.execute(statement,[userInfo, thingName, address, tips, phone]);
        return result;
    }


    /**
     * 功能：失物图片的字段上传
     * 参数：mimetype, filename, size, insertId
     * 返回：数组
     * @returns 
     */
    async createPicture(mimetype, filename, size, insertId) {
        const statement = `INSERT INTO swimg (mimetype, filename, size, swId) VALUES(?,?,?,?);`
        const [result] = await connection.execute(statement,[mimetype, filename, size, insertId]);
        return result;
    }


    /**
     * 功能：获取失物图片的字段
     * 参数：filename
     * 返回：数组第一个元素
     * @returns 
     */

    async getSwImgInfo(filename) {
        const statement = `SELECT * FROM swimg WHERE filename = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
}


//数据交互导出
module.exports = new SwService();