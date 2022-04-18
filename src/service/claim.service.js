const connection = require('../app/database');


/**
 * 搜索框功能的实现
 */
class claim {
    
    /**
     * 功能：查询用户已认领的失物信息
     * 参数：id
     * 返回：数组
     * @returns 
     */
    async lostClaim(id) {
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

            FROM tb_loststuff LEFT JOIN tb_user ON tb_loststuff.id = tb_user.id where tb_loststuff.id2 = ?;`
        const [result] = await connection.execute(statement,[id]);
        return result;
    }



    /**
     * 功能：查询用户已认领的寻物信息
     * 参数：id
     * 返回：数组
     * @returns 
     */
     async findClaim(id) {
        const statement = `SELECT tb_findstuff.num,
        tb_findstuff.title,
        tb_findstuff.address,
        tb_findstuff.phone,
        tb_findstuff.message,
        tb_findstuff.state,
        tb_findstuff.createAt,
        tb_findstuff.updateAt,
        JSON_OBJECT('id', tb_user.id, 'headImageUrl', tb_user.headImageUrl) publisherInfo,

            (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/findstuff/images/', tb_findimg.filename)) 
            FROM tb_findimg WHERE tb_findstuff.num = tb_findimg.findId) image,

            (select JSON_ARRAYAGG(JSON_OBJECT('id', tb_user.id, 'name', tb_user.name, 'phone', tb_user.phone)) 
            from tb_user where tb_user.id = tb_findstuff.id2) receiverInfo

            FROM tb_findstuff LEFT JOIN tb_user ON tb_findstuff.id = tb_user.id where tb_findstuff.id2 = ?;`
        const [result] = await connection.execute(statement,[id]);
        return result;
    }


}


//将这个类导出
module.exports = new claim();