var models = require('../models/models.js');


//Autoloas
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
         )//.catch(function(error){next(error);});   
};

//Get /quizes/
exports.index = function(req,res){

        	models.Quiz.findAll().success(function(quizes) {
		res.render('quizes/index.ejs',{quizes:quizes});
	})//.catch(function(error) { next(error); })
        
    
};


//Get /quizes/answer
exports.show = function(req,res){
    //console.log(req.quiz);
    res.render('quizes/show',{quiz: req.quiz});
};

exports.answer = function(req,res){
    var resultado ='Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
        resultado='Correcto';
    }
    res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
};
