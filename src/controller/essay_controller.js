const connection = require('../../database/index');
const tableName = 'essayInfo';

// 获取文章列表
const getSomeEssay = (num, offset) => {
    const sql = num? `select * from ${tableName} limit ${num} offset ${(offset? offset : 0)};` : `select * from ${tableName};`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) return reject('fail');
            return resolve(res[0]);
        })
    });
}