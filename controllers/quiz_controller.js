var models = require('../models/models.js');


//Autoloads
exports.load = function(req, res, next, quizId) {
    //console.log('hola1');
    models.Quiz.find(quizId).success(
            function (quiz){
                if (quiz){
                    //console.log(quiz);
                    req.quiz = quiz;
                    next();
                } else { next (new Error('No existe quizId='+quizId));}
            }
         )
};

//Get /quizes/
exports.index = function(req,res){
  //console.log(req);
  buscar = req.query.buscar;
  console.log('El valor de buscar='+buscar);
  
  if(buscar) {
    buscar = buscar.replace(/\s/g,"%");
    models.Quiz.findAll({where: ["pregunta LIKE '%"+buscar+"%'"], order: 'pregunta ASC'}).then(function(quizes){
      res.render('quizes/index', {quizes: quizes, errors: []});  
    })
  //  .catch(function(error) {next(error);});
  } else {
    models.Quiz.findAll().then(function(quizes){
      res.render('quizes/index', {quizes: quizes, errors: []});  
    })
   // .catch(function(error) {next(error);});
  }
};


//Get /quizes/answer
exports.show = function(req,res){
    //console.log(req.quiz);
    res.render('quizes/show',{quiz: req.quiz, errors: []});
};

exports.answer = function(req,res){
    var resultado ='Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
        resultado='Correcto';
    }
    res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
};

//Quiz New
exports.new = function(req, res) {
  var quiz = models.Quiz.build({pregunta: 'Pregunta', respuesta: 'Respuesta', tema: 'otro'});
  res.render('quizes/new', {quiz: quiz, errors: []});  
};

//Quiz Create
exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);
  
  console.log(req);
  console.log('Valor:');
  console.log(quiz);
  
     /*quiz.save({fields: ['pregunta', 'respuesta', 'tema']}).then(function(){
        res.redirect('/quizes');
      });*/
  
  quiz
  .validate()
  .then(function(err){
    if(err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors})
    } else {
      quiz.save({fields: ['pregunta', 'respuesta', 'tema']}).then(function(){
        res.redirect('/quizes');
      });
    }
  });
};

//Quiz Edit
exports.edit = function(req, res) {
  var quiz = req.quiz;

  res.render('quizes/edit', {quiz: quiz, errors: []});  
};

//Quiz Update
exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

    req.quiz
      .validate()
      .then(function(err){
        if(err) {
          res.render('quizes/edit', {quiz: req.quiz, errors: err.errors})
        } else {
          req.quiz.save({fields: ['pregunta', 'respuesta', 'tema']}).then(function(){
            res.redirect('/quizes');
          });
        }
      });
    };

//Quiz Destroy
exports.destroy = function(req, res) {
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};