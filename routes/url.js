const express = require('express');
const router = express.Router();

const Url = require('./../models/Url');

router.get('/', (req, res) => {
    const context = {
        title: 'Shortify',
    };
    res.render('index', context);
});

module.exports = router;
