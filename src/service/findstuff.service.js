const connection = require('../app/database');


/**
 * 寻物启事上传功能的实现
 */
class findStuffService {
    
    /**
     * 功能：获取所有寻物表信息
     * 参数：无
     * 返回：数组
     * @returns 
     */
    async getFindInfo() {
        const statement = `SELECT tb_findstuff.num,
        tb_findstuff.title,
        tb_findstuff.address,
        tb_findstuff.phone,
        tb_findstuff.message,
        tb_findstuff.state,
        tb_findstuff.createAt,
        tb_findstuff.updateAt,
        JSON_OBJECT('id', tb_user.id, 'headImageUrl', tb_user.headImageUrl) userInfo,
            (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/findstuff/images/', tb_findimg.filename)) 
            FROM tb_findimg WHERE tb_findstuff.num = tb_findimg.findId) image
            FROM tb_findstuff LEFT JOIN tb_user ON tb_findstuff.id = tb_user.id;`
        const [result] = await connection.execute(statement);
        return result;
    }



    /**
     * 功能：获取用户id下的寻物表信息
     * 参数：无
     * 返回：数组
     * @returns 
     */
     async getMyFindInfo(id) {
        const statement = `SELECT tb_findstuff.num,
        tb_findstuff.title,
        tb_findstuff.address,
        tb_findstuff.phone,
        tb_findstuff.message,
        tb_findstuff.state,
        tb_findstuff.createAt,
        tb_findstuff.updateAt,
        JSON_OBJECT('id', tb_user.id, 'headImageUrl', tb_user.headImageUrl) userInfo,
            (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/findstuff/images/', tb_findimg.filename)) 
            FROM tb_findimg WHERE tb_findstuff.num = tb_findimg.findId) image
            FROM tb_findstuff LEFT JOIN tb_user ON tb_findstuff.id = tb_user.id where tb_user.id = ?;`
        const [result] = await connection.execute(statement,[id]);
        return result;
    }


    /**
     * 功能：改变寻物启事状态：0为未寻回，1为寻回
     * 参数：num
     * 返回：数组
     * @returns 
     */

     async changeFindState(num) {
        const statement = `update tb_findstuff set state = 1 where num = ?`
        const [result] = await connection.execute(statement, [num]);
        return result;
    }



    /**
     * 功能上传寻物表信息
     * 参数：id, title, address, phone, message, state
     * 返回：数组
     * @returns 
     */
    async uploadFindInfo(id, title, address, phone, message, state) {
        const statement = `INSERT INTO tb_findstuff (id, title, address, phone, message, state) VALUES(?,?,?,?,?,?);`
        const [result] = await connection.execute(statement,[id, title, address, phone, message, state]);
        return result;
    }


    /**
     * 功能：寻物图片的字段上传到数据库
     * 参数：filename, type, size, lostId
     * 返回：数组
     * @returns 
     */
    async createImgPath(filename, type, size, findId) {
        const statement = `INSERT INTO tb_findimg (filename, type, size, findId) VALUES(?,?,?,?);`
        const [result] = await connection.execute(statement,[filename, type, size, findId]);
        return result;
    }


    /**
     * 功能：获取寻物图片的字段
     * 参数：filename
     * 返回：数组第一个元素
     * @returns 
     */

    async getFindImgInfo(filename) {
        const statement = `SELECT * FROM tb_findimg WHERE filename = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
}


//数据交互导出
module.exports = new findStuffService();