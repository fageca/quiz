var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(req, res) {
  res.render('author');
});

//Autoload
router.param('quizid',quizController.load);

//Definicion de rutas de /quiz
router.get('/quizes',quizController.index);
router.get('/quizes/:quizid(\\d+)',quizController.show);
router.get('/quizes/:quizid(\\d+)/answer',quizController.answer);

module.exports = router;
