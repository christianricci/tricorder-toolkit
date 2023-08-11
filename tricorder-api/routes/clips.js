var express = require('express');
var router = express.Router();

/* GET clips listing. */
router.get('/', function(req, res, next) {
  // clipboard has been module exported in bin/www
  clipboard.history(res);
});

/* GET clips listing. */
router.get('/clear', function(req, res, next) {
  // clipboard has been module exported in bin/www
  clipboard.clear(res);
});

module.exports = router;
