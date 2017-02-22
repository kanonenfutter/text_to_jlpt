var express = require('express');
var router = express.Router();
var mongoDB = require('mongoskin');
var db = mongoDB.db('mongodb://localhost/mydb?auto_reconnect=true', {
    safe: true
});

db.bind('kanjis');
var kanjiCollection = db.kanjis;

/*db.bind('n1');
var n1Collection = db.n1;*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kanji Display' });
});

router.post('/input', function (req, res, next) {
  var text = JSON.stringify(req.body.input);
  //Remove unessessary characters
  //https://gist.github.com/terrancesnyder/1345094
  text = text.replace(/[ぁ-ゔゞァ-・ヽヾ゛゜ー\w]/gi, "");
  text = text.replace(/[。]/gi, "");
  text = text.replace(/[\–]/gi, "");
  text = text.replace(/[（]/gi, "");
  text = text.replace(/[）]/gi, "");
  text = text.replace(/[「]/gi, "");
  text = text.replace(/[」]/gi, "");
  text = text.replace(/[、]/gi, "");
  text = text.replace(/[\[\]]/gi, "");
  text = text.replace(/[\(\)]/gi, "");
  text = text.replace(/[『]/gi, "");
  text = text.replace(/[』]/gi, "");
  text = text.replace(" ", "");
  text = text.replace("\"", "");

  // Remove duplicates
  var unique = text.split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join('');
  

  var splitted = unique.split('');

  var dictdata;

  //Retrieve metadata for each JLTP Kanji. Now: N5 only. Projection: Exclude Kunyomi and Onyomi
  kanjiCollection.find({"kanji": {$in: splitted}}, {_id: 0, kun_readings: 0, on_readings: 0}).toArray(function(error, results){
    if (error) {
      next(error);
    } else{
      dictdata = results;
      // Response to the client
      res.json({unique: unique, raw: JSON.stringify(req.body.input), defs: dictdata});
    }
  });
});

module.exports = router;

