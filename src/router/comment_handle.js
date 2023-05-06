const express = require('express');
const url = require('url');

const { getSomeComment, addComment, modifyComment, deleteComment } = require('../controller/comment_controller');
const { ErrorModel, SuccessModel } = require('../model/responseModel');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('some apis of comment')
})
router.post('/', (req, res) => {
    res.send('some apis of comment');
})

// 获取评论列表
router.get('/list', (req, res) => {
    const { num, offset, key, type } = url.parse(req.url, true).query; // type为0，代表使用essayId查找，1为username查找
    getSomeComment(num, offset, key, type)
    .then(response => {
        const message = `已成功获取${response.length}条数据(偏移量: ${offset || 0})`;
        res.send(new SuccessModel(response, message));
    })
    .catch(error => res.send(new ErrorModel(error)));
}) 

// 添加评论
router.post('/add', (req, res) => {
    const { content, targetId, username } = req.body;
    addComment(content, targetId, username)
    .then(() => res.send(new SuccessModel('评论发表成功')))
    .catch(error => res.send(new ErrorModel(error)));
})

// 修改评论
router.post('/modify', (req, res) => {
    modifyComment(req.body)
    .then(() => res.send(new SuccessModel('评论修改成功')))
    .catch(error => res.send(new ErrorModel(error)));
})

// 删除评论
router.get('/delete', (req, res) => {
    const { commentId } = url.parse(req.url, true).query;
    deleteComment(commentId)
    .then(() => res.send(new SuccessModel('评论删除成功')))
    .catch(error => res.send(new ErrorModel(error)));
})

module.exports = router