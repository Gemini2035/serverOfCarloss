// express, router
const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');

router.get('/', (req, res) => {
    res.send('some apis of essay');
});

// 获取文章列表功能
router.get('/list', (req, res) => {
    // const { query, pathname } = url.parse(req.url, true);
    // console.log(query, pathname);

    fs.readFile("src/json/studyEssayList.json", "utf8", (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        res.send(data);
    })
    // 加装数据库
});

// 删除文章功能
router.get('/delete', (req, res) => {
    // 在controller层中实现权限查询
    const { username } = url.parse(req.url, true).query;
    console.log(username)
    res.send('删除功能');
});

// 文章上传功能
router.post('/add', (req, res) => {
    console.log(req.body);
    res.send({
        msg: "1"
    })
});

// 文章修改功能
router.post('/modify', (req, res) => {
    console.log(req.body);
    res.send('修改请求');
});

module.exports = router;
