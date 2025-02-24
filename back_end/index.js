var express = require('express');
var router = express.Router();
var db = require('./db')

/* GET index. */ 
router.get('/', async (req, res, next) => {
  try {
    const places = await db.findAll("places");
    res.render('index', { title: 'Places', places });
  } catch (err) {
    next(err);
  }
})

module.exports = router;