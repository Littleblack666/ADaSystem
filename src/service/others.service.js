const connection = require('../app/database');


/**
 * 搜索框功能的实现
 */
class searchService {
    
    /**
     * 功能：根据获得的失物字段进行模糊查询
     * 参数：title
     * 返回：数组
     * @returns 
     */
    async lostSearch(title) {
        title = '%' + title + '%';
        // const statement = `SELECT * FROM tb_loststuff WHERE title like ? ;`
        const statement = `SELECT tb_loststuff.num,
        tb_loststuff.title,
        tb_loststuff.address,
        tb_loststuff.phone,
        tb_loststuff.message,
        tb_loststuff.state,
        tb_loststuff.createAt,
        tb_loststuff.updateAt,
        JSON_OBJECT('id', tb_user.id, 'headImageUrl', tb_user.headImageUrl) userInfo,
            (SELECT JSON_ARRAYAGG(CONCAT('http://121.41.115.226:8001/loststuff/images/', tb_lostimg.filename)) 
            FROM tb_lostimg WHERE tb_loststuff.num = tb_lostimg.lostId) image
            FROM tb_loststuff LEFT JOIN tb_user ON tb_loststuff.id = tb_user.id WHERE title like ?;`
        const [result] = await connection.execute(statement, [title]); 
        return result;
    }

    /**
     * 功能：根据获得的寻物字段进行模糊查询
     * 参数：title
     * 返回：数组
     * @returns 
     */
     async findSearch(title) {
        title = '%' + title + '%';
        // const statement = `SELECT * FROM tb_findstuff WHERE title like ?;`
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
            FROM tb_findstuff LEFT JOIN tb_user ON tb_findstuff.id = tb_user.id WHERE title like ?;`
        const [result] = await connection.execute(statement, [title]); 
        return result;
    }

}


//将这个类导出
module.exports = new searchService();