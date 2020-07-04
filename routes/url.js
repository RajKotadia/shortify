const querystring = require('querystring');
const express = require('express');
const validator = require('validator');

const { baseURL } = require('./../config/config');
const ShortUrl = require('./../models/ShortUrl');

const router = express.Router();

// the index page
router.get('/', async (req, res) => {
    const query = req.query;
    const context = {};

    // check if the url contains a query string
    if (query.success === 'true') {
        context.success = true;
        context.shortURL = `${baseURL}/${query.code}`;
        return res.render('index', context);
    } else if (query.error === 'true') {
        context.error = true;
        return res.render('index', context);
    }

    res.render('index');
});

// to shorten a url
router.post('/shorten', async (req, res) => {
    const url = req.body.url.toLowerCase();

    // check if the url submitted is correct
    const result = validator.isURL(url, {
        require_protocol: true,
    });

    // for an invalid url
    if (!result) {
        // add required data to query parameters and redirect to index page
        const query = querystring.stringify({
            error: true,
        });

        return res.redirect(`/?${query}`);
    }

    try {
        // check if the same url already exists in db
        let shortURL = await ShortUrl.findOne({ url });

        // if it does not exist create a new urlcode
        if (!shortURL) {
            const newShortURL = new ShortUrl({ url });
            shortURL = await newShortURL.save();
        }

        // oncewe have the code redirect it to index page
        const query = querystring.stringify({
            success: true,
            code: shortURL.urlCode,
        });

        res.redirect(`/?${query}`);
    } catch (err) {
        console.log(err);
        res.render('500');
    }
});

// to redirect the user to original url
router.get('/:code', async (req, res) => {
    const code = req.params.code;

    try {
        // find the url with given code
        const result = await ShortUrl.findOne({ urlCode: code });

        // if the code is incorrect
        if (!result) {
            return res.render('404');
        }

        res.redirect(result.url);
    } catch (err) {
        console.log(err);
        res.render('500');
    }
});

module.exports = router;
