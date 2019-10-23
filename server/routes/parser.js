const express = require('express'),
    router = express.Router(),
    parser = require('./parser/parser');

router.post('/', function(req, res) {
    parser.getNews(req.body.newsResource)
        .then(json => {
            res.status(200).json(json);
        })
        .catch(() => {
            res.status(500).send('Error');
        })
});

module.exports = router;
