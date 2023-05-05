// express, router
const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');
const { getAccount } = require('../controller/account_controller');

router.get('/', (req, res) => {
    getAccount().then(response => {
        console.log(response);
        res.send('some apis of account');
    })
    // res.send('some apis of account');

});

// router.get('')


module.exports = router;
