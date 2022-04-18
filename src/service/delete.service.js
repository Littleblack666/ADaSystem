const connection = require('../app/database');


/**
 * 删除功能的实现
 */
class deleteService {
    
    /**
     * 功能：失物信息的删除
     * 参数：num
     * 返回：无
     * @returns 
     */
    async lostDelete(num) {
        const statement1 = `DELETE FROM tb_lostimg WHERE lostId = ?;`
        await connection.execute(statement1, [num]); 

        const statement2 = `DELETE FROM tb_loststuff WHERE num = ?;`
        await connection.execute(statement2, [num]);
    }

    /**
     * 功能：寻物信息的删除
     * 参数：num
     * 返回：数组
     * @returns 
     */
     async findDelete(num) {
        const statement1 = `DELETE FROM tb_findimg WHERE findId = ?;`
        await connection.execute(statement1, [num]); 

        const statement2 = `DELETE FROM tb_findstuff WHERE num = ?;`
        await connection.execute(statement2, [num]);
    }

    /**
     * 功能：用户信息的删除
     * 参数：id
     * 返回：数组
     * @returns 
     */
     async userDelete(id) {
         /*****************************************************************/
        //查找该用户名下的失物信息
        const statement1 = `select num from tb_loststuff where id = ?;`
        const [result1] = await connection.execute(statement1, [id]); 

        //删除失物图片信息
        result1.forEach(async lostinfo => {
            let state = `DELETE FROM tb_lostimg WHERE lostId = ?;`
            await connection.execute(state, [lostinfo.num]);
        })

        //删除失物信息
        const statement2 = `DELETE FROM tb_loststuff WHERE id = ?;`
        await connection.execute(statement2, [id]);

         /*****************************************************************/

        //查找该用户名下的寻物信息
        const statement3 = `select num from tb_findstuff where id = ?;`
        const [result2] = await connection.execute(statement3, [id]); 

        //删除寻物图片信息
        result2.forEach(async findinfo => {
            let state = `DELETE FROM tb_findimg WHERE findId = ?;`
            await connection.execute(state, [findinfo.num]);
        })

        //删除寻物信息
        const statement4 = `DELETE FROM tb_findstuff WHERE id = ?;`
        await connection.execute(statement4, [id]);

         /*****************************************************************/

        //删除用户信息
        const statement5 = `DELETE FROM tb_user WHERE id = ?;`
        await connection.execute(statement5, [id]);
        
    }

}


//将这个类导出
module.exports = new deleteService();