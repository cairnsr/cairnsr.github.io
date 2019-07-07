module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCharacters(res, mysql, context, complete){
        mysql.pool.query("SELECT id, fname, lname FROM characters", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    function getMovies(res, mysql, context, complete){
        mysql.pool.query("SELECT id, title FROM movies", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.movies = results;
            complete();
        });
    }

    function getCharacter_Movies(res, mysql, context, complete){
        mysql.pool.query("SELECT c.fname, c.lname, m.title FROM character_movie AS cm LEFT JOIN characters AS c ON c.id = cm.character_id LEFT JOIN movies AS m ON m.id = cm.movie_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.character_movie = results;
            complete();
        });
    }


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js"];
        var mysql = req.app.get('mysql');
        getCharacters(res, mysql, context, complete);
        getMovies(res, mysql, context, complete);
        getCharacter_Movies(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('character_movie', context);
            }
        }
    });

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO character_movie (character_id, movie_id) VALUES (?,?)";
        var inserts = [req.body.character_id, req.body.movie_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('character_movie');
            }
        });
    });

    return router;
}();
