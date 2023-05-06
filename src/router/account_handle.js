// express, router
const express = require('express');
const router = express.Router();
const { accountLogin, accountRegist } = require('../controller/account_controller');
const { ErrorModel, SuccessModel } = require('../model/responseModel');

router.get('/', (req, res) => {
    res.send('some apis of account');
});
router.post('/', (req, res) => {
    res.send('some apis of account');
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    accountLogin(username, password)
    .then(response => {
        const message = `登录成功，欢迎你 ${username}`;
        res.send(new SuccessModel(response, message));
    })
    .catch(error => res.send(new ErrorModel(error)))
})

router.post('/registe', (req, res) => {
    const { username, password } = req.body;
    accountRegist(username, password)
    .then(() => res.send(new SuccessModel('注册成功')))
    .catch(error => res.send(new ErrorModel(error)))
})

// router.get('')


module.exports = router;
