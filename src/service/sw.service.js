const connection = require('../app/database');

class SwService {
    async getSwList() {
        const statement = `SELECT *,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/sw/images/', swimg.filename)) FROM swimg WHERE tb_thing.id = swimg.swId) AS image
        FROM tb_thing;`
      const [result] = await connection.execute(statement); 
        return result;
    }

    async swUploadInfo(userInfo, thingName, address, tips, phone) {
        const statement = `INSERT INTO tb_thing (userInfo, thingName, address, tips, phone) VALUES(?,?,?,?,?);`
        const [result] = await connection.execute(statement,[userInfo, thingName, address, tips, phone]);
        return result;
    }

    async createPicture(mimetype, filename, size, insertId) {
        const statement = `INSERT INTO swimg (mimetype, filename, size, swId) VALUES(?,?,?,?);`
        const [result] = await connection.execute(statement,[mimetype, filename, size, insertId]);
        return result;
    }

    async getSwImgInfo(filename) {
        const statement = `SELECT * FROM swimg WHERE filename = ?;`;
        const [result] = await connection.execute(statement, [filename]);
        return result[0];
    }
}

module.exports = new SwService();