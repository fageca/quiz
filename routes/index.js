var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');
var sessionController = require('../controllers/session_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res, next) {
  res.render('author', {errors: []});
});

//Autoload
router.param('quizid',quizController.load);
router.param('commentId', commentController.load);

//Definicion de rutas de /quiz
router.get('/quizes',quizController.index);
router.get('/quizes/:quizid(\\d+)',quizController.show);
router.get('/quizes/:quizid(\\d+)/answer',quizController.answer);

router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired ,quizController.create);
router.get('/quizes/:quizid(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizid(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizid(\\d+)', sessionController.loginRequired, quizController.destroy);

//Rutas del Comment
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

//Rutas Login
router.get('/login',  sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

module.exports = router;
