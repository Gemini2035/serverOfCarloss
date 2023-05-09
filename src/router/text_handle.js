const express = require('express');
const url = require('url');
const formidable = require('formidable');
const path = require('path');

const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { getSomeEssay, getEssayDetail, deleteEssay, addEssay } = require('../controller/essay_controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('some apis of text');
});
router.post('/', (req, res) => {
    res.send('some apis of text');
});

router.get('/get', (req, res) => {
    const url = 'src/json/text.json';
    const message = `Successfully obtained website text information!`;
        const options = {
            dotfiles: 'deny',
            headers: {
              'x-sent': true,
              'x-detail-info': JSON.stringify(new SuccessModel(message)) // your custom header here
            }
          }
        const abusolutePath = path.join(__dirname, '../../', url);
        res.sendFile(abusolutePath, options, error => {
            if (error) res.send(new ErrorModel(`发送文件失败，错误代码: ${error.statusCode}`));
        });
})

module.exports = router;