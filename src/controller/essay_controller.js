const fs = require('fs');

const connection = require('../../database/index');

const TABLENAME = 'essayInfo';

// 获取文章列表
const getSomeEssay = (num, offset) => {
    const sql = `select * from ${TABLENAME} ${num? `limit ${num} offset ${offset? offset : 0}` : ''}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, res) => {
            if (error) return reject(error.sqlMessage); 
            else return resolve(res);
        })
    });
}


// 获取具体的文章信息
const getEssayDetail = (essayId) => {
    if (essayId) {
        const sql = `select * from ${TABLENAME} where essayId = ${essayId}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, (error, res) => {
                if (error) return reject(error.sqlMessage);
                else if (!res[0]) return reject(`文章id(essayId): ${essayId} 不存在`);
                else return resolve(res[0]);
            })
        })
    } else return Promise.reject('未指定文章的id信息(essayId)');
}

// 添加新的文章
const addEssay = (newEssayInfo) => {
   // 由于数据库中essayId有自增长属性，所以可以直接添加其他部分信息
   const sql = `insert into ${TABLENAME} (classify, filePath, pubdate, title) values (?, ?, ?, ?)`;
   const parms = [newEssayInfo.classify, newEssayInfo.filePath, newEssayInfo.pubdate, newEssayInfo.title];
   return new Promise((resolve, reject) => {
        connection.query(sql, parms, (error, res) => {
            if (error) return reject(error.sqlMessage);
            else {
                if (res.affectedRows) return resolve();
                else return reject(`新博客添加失败`);
            }
        })
   })
}

// 修改文章，暂不开放

// 删除文章
const deleteEssay = (essayId, essayPath) => {
    if (!essayPath) return Promise.reject('必须提供文章路径参数');
    if (essayId) {
        // 先尝试删除文件
        return new Promise((resolve, reject) => {
            fs.unlink(essayPath, err => {
                if (err) return reject(error);
                else return resolve();
            })
        })
        .then(() => {
            const sql = `delete from essayInfo where essayId = ${essayId}`;
            return new Promise((resolve, reject) => {
                connection.query(sql, (error, res) => {
                    if (error) return reject(error.sqlMessage);
                    else {
                        if (res.affectedRows) return resolve();
                        else return reject(`未找到指定文章id(essayId)为 ${essayId} 的相关信息`);
                    }
                })
            })
        })
        .catch(err => { return Promise.reject(err)});
    } else return Promise.reject('未指定文章的id信息(essayId)');
}

module.exports = {
    getSomeEssay,
    getEssayDetail,
    deleteEssay,
    addEssay
}