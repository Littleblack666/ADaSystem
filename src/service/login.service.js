const connection = require('../app/database');


/**
 * 微信登录功能的实现
 */
class loginService {
    
    /**
     * 功能：根据获得的微信唯一标识id查询数据库，无的话进行添加，有的话将头像和微信名更新
     * 参数：id, name, headImageUrl
     * 返回：字符串信息
     * @returns 
     */
    async wechatLogin(id, name, headImageUrl) {
        const statement = `SELECT * FROM tb_user WHERE id = ?;`
        const [result] = await connection.execute(statement, [id]); 

        //如果表中已存在微信用户信息
        if (result != null && result != 0){
            const statement = `UPDATE tb_user SET name = ?, headImageUrl = ? WHERE id = ?;`
            await connection.execute(statement, [name, headImageUrl, id]); 

            return "用户信息已更新！";
        }

        //如果表中不存在微信用户信息
        else{
            const statement = `INSERT INTO tb_user (id, name, headImageUrl) VALUES(?,?,?);`
            await connection.execute(statement,[id, name, headImageUrl]);

            return "用户信息不存在，以为您新增信息！";
        }
        
    }

}


//将这个类导出
module.exports = new loginService();