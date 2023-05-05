// express, router
const express = require('express');
const router = express.Router();
const fs = require('fs');
const url = require('url');

router.get('/', (req, res) => {
    res.send('some apis of account');
});

// router.get('')


module.exports = router;
