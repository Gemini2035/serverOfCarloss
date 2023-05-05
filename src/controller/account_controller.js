const connection = require('../../database/index');

const getAccount = () => {
    let sql = 'select * from userInfo;';

    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) return reject('fail');
            return resolve(res[0]);
        })
    });
}

module.exports = {
    getAccount,
}

