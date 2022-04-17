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
        const statement = `SELECT * FROM tb_loststuff WHERE title like ? ;`
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
        const statement = `SELECT * FROM tb_findstuff WHERE title like ?;`
        const [result] = await connection.execute(statement, [title]); 
        return result;
    }

}


//将这个类导出
module.exports = new searchService();