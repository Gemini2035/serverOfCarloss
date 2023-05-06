const connection = require('../../database/index');

const TABLENAME = 'commentInfo';

// 获取评论列表
const getSomeComment = (num, offset, key, type) => {
    if (!key) return Promise.reject(1); // 关键词缺失
    if (!type) return Promise.reject(2); // 查找类型模糊
    const sql = `select * from ${TABLENAME} where ${type == 0? `username = '${key}'` : `targetId = ${key}`} ${num? `limit ${num} offset ${offset? offset : 0}` : ''} `;
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) return reject(error.sqlMessage); 
            else return resolve(res);
        })
    });
}

// 添加评论
const addComment = (content, targetId, username) => {
    const sql = `insert into ${TABLENAME} (commentDate, content, targetId, username) values (?, ?, ?, ?)`;
    const parms = [new Date().toLocaleDateString(), content, targetId, username];
    return new Promise((resolve, reject) => {
        connection.query(sql, parms, (error, res) => {
            if (error) return reject(0); // 评论发表失败
            else {
                if (res.affectedRows) return resolve();
                else return reject(0);
            }
        })
   })
}

const modifyComment = newComment => {
    const sql = `update ${TABLENAME} set commentDate = ?, content = ? where commentId = ?`;
    const parms = [new Date().toLocaleDateString(), newComment.content, newComment.commentId];
    return new Promise((resolve, reject) => {
        connection.query(sql, parms, (error, res) => {
            if (error) return reject(error.sqlMessage);
            else {
                if (res.affectedRows) return resolve();
                else return reject(1) // 评论id错误
            }
        })
    })
}

const deleteComment = commentId => {
    const sql = `delete from ${TABLENAME} where commentId = ${commentId}`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) return reject(error.sqlMessage);
            else {
                if (res.affectedRows) return resolve();
                else return reject(1) // 评论id不存在
            }
        })
    })
}

module.exports = {
    getSomeComment,
    addComment,
    modifyComment,
    deleteComment
}
