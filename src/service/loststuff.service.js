const connection = require('../app/database');


/**
 * 失物上传功能的实现
 */
class lostStuffService {
    
    /**
     * 功能：获取失物表信息
     * 参数：无
     * 返回：数组
     * @returns 
     */
    async getLostInfo() {
        const statement = `SELECT *,
        (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/loststuff/images/', tb_lostImg.filename)) 
        FROM tb_lostImg WHERE tb_lostStuff.num = tb_lostImg.id) AS image
        FROM tb_lostStuff;`
        const [result] = await connection.execute(statement); 
        return result
    }

    /**
     * 功能上传失物表信息
     * 参数：id, title, address, phone, message, state
     * 返回：数组
     * @returns 
     */
    async uploadLostInfo(id, title, address, phone, message, state) {
        const statement = `INSERT INTO tb_lostStuff (id, title, address, phone, message, state) VALUES(?,?,?,?,?,?);`
        const [result] = await connection.execute(statement,[id, title, address, phone, message, state]);
        return result;
    }


    /**
     * 功能：失物图片的字段上传到数据库
     * 参数：filename, type, size, lostId
     * 返回：数组
     * @returns 
     */
    async createImgPath(filename, type, size, lostId) {
        const statement = `INSERT INTO tb_lostImg (filename, type, size, lostId) VALUES(?,?,?,?);`
        const [result] = await connection.execute(statement,[filename, type, size, lostId]);
        return result;
    }


    /**
     * 功能：获取失物图片的字段
     * 参数：filename
     * 返回：数组第一个元素
     * @returns 
     */

    async getLostImgInfo(filename) {
        const statement = `SELECT * FROM tb_lostImg WHERE filename = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
}


//数据交互导出
module.exports = new lostStuffService();