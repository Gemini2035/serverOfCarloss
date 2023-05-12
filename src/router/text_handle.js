const express = require('express');
const url = require('url');
const path = require('path');

const { SuccessModel, ErrorModel } = require('../model/responseModel');
const { siteSpider } = require('../controller/text_controller')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('some apis of text');
});
router.post('/', (req, res) => {
    res.send('some apis of text');
});

router.get('/get', (req, res) => {
    const { name } = url.parse(req.url, true).query;
    const fileUrl = `src/json/${name}.json`;
    const message = `Successfully obtained website text information!`;
        const options = {
            dotfiles: 'deny',
            headers: {
              'x-sent': true,
              'x-detail-info': JSON.stringify(new SuccessModel(message)) // your custom header here
            }
          }
        const abusolutePath = path.join(__dirname, '../../', fileUrl);
        res.sendFile(abusolutePath, options, error => {
            if (error) res.send(new ErrorModel(`发送文件失败，错误代码: ${error.statusCode}`));
        });
})

router.get('/sitelanguage', (req, res) => {
    siteSpider()
    .then(response => {
        res.send(new SuccessModel(response));
    })
    .catch(error => {
        res.send(new ErrorModel(error));
    })
})

module.exports = router;