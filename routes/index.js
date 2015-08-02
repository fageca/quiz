var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res, next) {
  res.render('author', {errors: []});
});

//Autoload
router.param('quizid',quizController.load);

//Definicion de rutas de /quiz
router.get('/quizes',quizController.index);
router.get('/quizes/:quizid(\\d+)',quizController.show);
router.get('/quizes/:quizid(\\d+)/answer',quizController.answer);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizid(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizid(\\d+)', quizController.update);
router.delete('/quizes/:quizid(\\d+)', quizController.destroy);



module.exports = router;
