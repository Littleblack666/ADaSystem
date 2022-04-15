const connection = require('../app/database');


/**
 * 用户信息的查询和上传功能的实现
 */
class userInfoService {
    
    /**
     * 功能：查询用户信息
     * 参数：id
     * 返回：数组
     * @returns 
     */
     async userInfoChecked(id) {
        const statement = `SELECT * FROM tb_user WHERE id = ?;`
        const [result] = await connection.execute(statement,[id]);
        return result;
    }



    /**
     * 功能：上传用户信息
     * 参数：id, schoolName, collage, studentId, phone
     * 返回：数组
     * @returns 
     */
    async userInfoUpload(id, schoolName, collage, studentId, phone) {
        //查询数据库信息
        //const statement = `SELECT * FROM tb_user WHERE id = ?;`
        //const [result] = await connection.execute(statement,[id]);
        // console.log(result);
        // const result1 = [result.schoolName, result.collage, result.studentId, result.phone]

        //if(result1 != null && result1 != 0 && result1 != []){
            //若查询成功有该用户信息
            const statement = `UPDATE tb_user SET schoolName = ?, collage = ?, studentId = ?, phone = ? WHERE id = ?;`
            const [result] = await connection.execute(statement,[schoolName, collage, studentId, phone, id]);

        //}else{
            //若查询不到该用户信息
            //const statement = `INSERT INTO tb_user (id, schoolName, collage, studentId, phone) VALUES(?,?,?,?,?);`
            //const [result] = await connection.execute(statement,[id, schoolName, collage, studentId, phone]);

        //}
        
    }

}


//数据交互导出
module.exports = new userInfoService();