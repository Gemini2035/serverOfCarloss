// express, router
const express = require('express');
const url = require('url');
const formidable = require('formidable');
const path = require('path');

const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { getSomeEssay, getEssayDetail, deleteEssay, addEssay } = require('../controller/essay_controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('some apis of essay');
});
router.post('/', (req, res) => {
    res.send('some apis of essay');
})

// 获取文章列表功能
router.get('/list', (req, res) => {
    const { num, offset } = url.parse(req.url, true).query;
    getSomeEssay(num, offset)
    .then(response => {
        const message = `已成功获取${response.length}条数据(偏移量: ${offset || 0})`;
        res.send(new SuccessModel(response, message))
    })
    .catch(error => res.send(new ErrorModel(error)));
});

// 获取特定文章信息，发送md文件
router.get('/detail', (req, res) => {
    const { essayId } = url.parse(req.url, true).query;
    getEssayDetail(essayId)
    .then(response => {
        const message = `已成功获取文章id为: ${essayId} 的详细信息`;
        const options = {
            dotfiles: 'deny',
            headers: {
              'x-sent': true,
              'x-detail-info': new SuccessModel(response, message) // your custom header here
            }
          }
        const abusolutePath = path.join(__dirname, '../../', response.filePath);
        res.sendFile(abusolutePath, options, error => {
            if (error) res.send(new ErrorModel(`发送文件失败，错误代码: ${error.statusCode}`));
        });
    })
    .catch(error => res.send(new ErrorModel(error)));
})

// 删除文章功能
router.post('/delete', (req, res) => {
    const { essayId, filePath } = req.body;
    deleteEssay(essayId, filePath)
    .then(() => res.send(new SuccessModel(`博客删除成功`)))
    .catch(error => res.send(new ErrorModel(error)));
});

// 文章上传功能
router.post('/add', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = 'public/markdown';
    form.keepExtensions = true;

    new Promise((resolve, reject) => {
        form.parse(req, (error, fields, files)  => {
            if (error) return reject(error);
            else return resolve({fields, files});
        })
    })
    .then((response) => {
        const { fields, files } = response;
        fields.filePath = files.file.filepath;
        addEssay(fields)
                .then(() => res.send(new SuccessModel('博客添加成功')))
                .catch(err => res.send(new ErrorModel(err)));
    })
    .catch(err => res.send(new ErrorModel(err)));
});

// 文章修改功能，暂不开放

module.exports = router;
