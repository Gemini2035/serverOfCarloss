const connection = require('../../database/index');

const TABLENAME = 'userInfo'

const accountLogin = (username, password) => {
    const sql = `select * from ${TABLENAME} where username = '${username}'`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) return reject(error.sqlMessage);
            else {
                if (!res[0]) return reject(1); // 该账号不存在
                else {
                    if (res[0].password === password) return resolve(res[0]);
                    else return reject(2); // 密码与账号不匹配
                }
            };
        })
    })
}

const accountRegist = (username, password) => {
    const sql = `insert into ${TABLENAME} (exsitDate, password, permission, username) values (?, ?, ?, ?)`;
    const parms = [new Date().toLocaleDateString(), password, false, username];
    return new Promise((resolve, reject) => {
        connection.query(sql, parms, (error, res) => {
            if (error) return reject(1); // 账号已注册
            else {
                if (res.affectedRows) return resolve();
                else return reject(`新博客添加失败`);
            }
        })
   })
}

module.exports = {
    accountLogin,
    accountRegist,
}

