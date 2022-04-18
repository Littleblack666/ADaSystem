const connection = require('../app/database');


/**
 * 失物上传功能的实现
 */
class lostStuffService {
    
    /**
     * 功能：获取所有失物表信息
     * 参数：无
     * 返回：数组
     * @returns 
     */
    async getLostInfo() {
        const statement = `SELECT tb_loststuff.num,
        tb_loststuff.title,
        tb_loststuff.address,
        tb_loststuff.phone,
        tb_loststuff.message,
        tb_loststuff.state,
        tb_loststuff.createAt,
        tb_loststuff.updateAt,
        JSON_OBJECT('id', tb_user.id, 'headImageUrl', tb_user.headImageUrl) publisherInfo,

            (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/loststuff/images/', tb_lostimg.filename)) 
            FROM tb_lostimg WHERE tb_loststuff.num = tb_lostimg.lostId) image,

            (select JSON_ARRAYAGG(JSON_OBJECT('id', tb_user.id, 'name', tb_user.name, 'phone', tb_user.phone)) 
            from tb_user where tb_user.id = tb_loststuff.id2) receiverInfo

            FROM tb_loststuff LEFT JOIN tb_user ON tb_loststuff.id = tb_user.id;`
        const [result] = await connection.execute(statement);
        return result;
    }


    /**
     * 功能：获取用户id下的失物表信息
     * 参数：无
     * 返回：数组
     * @returns 
     */
     async getMyLostInfo(id) {
        const statement = `SELECT tb_loststuff.num,
        tb_loststuff.title,
        tb_loststuff.address,
        tb_loststuff.phone,
        tb_loststuff.message,
        tb_loststuff.state,
        tb_loststuff.createAt,
        tb_loststuff.updateAt,
        JSON_OBJECT('id', tb_user.id, 'headImageUrl', tb_user.headImageUrl) publisherInfo,

            (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/loststuff/images/', tb_lostimg.filename)) 
            FROM tb_lostimg WHERE tb_loststuff.num = tb_lostimg.lostId) image,

            (select JSON_ARRAYAGG(JSON_OBJECT('id', tb_user.id, 'name', tb_user.name, 'phone', tb_user.phone)) 
            from tb_user where tb_user.id = tb_loststuff.id2) receiverInfo

            FROM tb_loststuff LEFT JOIN tb_user ON tb_loststuff.id = tb_user.id where tb_user.id = ?;`
        const [result] = await connection.execute(statement,[id]);
        return result;
    }



    /**
     * 功能：改变失物招领状态：0为未招领，1为招领并显示招领人的信息
     * 参数：num, id, id2
     * 返回：数组
     * @returns 
     */

    async changeLostState(num, id, id2) {
        //先进行更新
        const statement1 = `update tb_loststuff set state = 1, id2 = ? where num = ?`
        await connection.execute(statement1, [id2, num]);

        //再进行查询并返回
        // const statement2 = `select * from tb_loststuff left join tb_user  on tb_user.id  = ? where tb_loststuff.num = ?;`
        // const statement2 = `select * from tb_user where id = ?;`

        const statement2 = `SELECT tb_loststuff.num,
        tb_loststuff.title,
        tb_loststuff.address,
        tb_loststuff.phone,
        tb_loststuff.message,
        tb_loststuff.state,
        tb_loststuff.createAt,
        tb_loststuff.updateAt,

        JSON_OBJECT('id', tb_user.id, 'headImageUrl', tb_user.headImageUrl) publisher,
        
        (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/loststuff/images/', tb_lostimg.filename)) 
        FROM tb_lostimg WHERE tb_loststuff.num = tb_lostimg.lostId) image,

        (select JSON_ARRAYAGG(JSON_OBJECT('id', tb_user.id, 'name', tb_user.name, 'phone', tb_user.phone)) 
        from tb_user where tb_user.id = tb_loststuff.id2) receiver
            
        FROM tb_loststuff LEFT JOIN tb_user ON tb_loststuff.id = tb_user.id where tb_user.id = ? and tb_loststuff.id2 = ?;`

        const [result] = await connection.execute(statement2, [id, id2]);
        return result;
    }




    /**
     * 功能：上传失物表基本信息
     * 参数：id, title, address, phone, message, state
     * 返回：数组
     * @returns 
     */
    async uploadLostInfo(id, title, address, phone, message, state) {
        const statement = `INSERT INTO tb_loststuff (id, title, address, phone, message, state) VALUES(?,?,?,?,?,?);`
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
        const statement = `INSERT INTO tb_lostimg (filename, type, size, lostId) VALUES(?,?,?,?);`
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
        const statement = `SELECT * FROM tb_lostimg WHERE filename = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
}


//数据交互导出
module.exports = new lostStuffService();