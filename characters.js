module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCharacters(res, mysql, context, complete){
        mysql.pool.query("SELECT c.id, c.fname, c.lname, s.name AS species, p.name AS planets, a.name AS alliance FROM characters AS c LEFT JOIN species AS s ON s.id = c.race LEFT JOIN planets AS p ON p.id = c.homeworld LEFT JOIN alliance AS a ON a.id = c.association", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    function getLikeCharacter(s, res, mysql, context, complete){
        mysql.pool.query("SELECT c.id, c.fname, c.lname, s.name AS species, p.name AS planets, a.name AS alliance FROM characters AS c LEFT JOIN species AS s ON s.id = c.race LEFT JOIN planets AS p ON p.id = c.homeworld LEFT JOIN alliance AS a ON a.id = c.association WHERE c.fname LIKE " + mysql.pool.escape(s + '%'), function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    function getPlanets(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM planets", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.planets = results;
            complete();
        });
    }

    function getSpecies(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM species", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.species = results;
            complete();
        });
    }

    function getAlliances(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM alliance", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.alliance = results;
            complete();
        });
    }

    function getCharacter(res, mysql, context, id, complete){
        var sql = "SELECT c.id, c.fname, c.lname, s.name AS species, p.name AS planets, a.name AS alliance FROM characters AS c LEFT JOIN species AS s ON s.id = c.race LEFT JOIN planets AS p ON p.id = c.homeworld LEFT JOIN alliance AS a ON a.id = c.association WHERE c.id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results[0];
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getCharacters(res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
        getSpecies(res, mysql, context, complete);
        getAlliances(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('characters', context);
            }
        }
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update.js", "selectOption.js"];
        var mysql = req.app.get('mysql');
        getCharacter(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
        getSpecies(res, mysql, context, complete);
        getAlliances(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('update-characters', context);
            }
        }
    });

    router.get('/search/:s', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete.js", "search.js"];
        var mysql = req.app.get('mysql');
        getLikeCharacter(req.params.s, res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
        getSpecies(res, mysql, context, complete);
        getAlliances(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('characters', context);
            }
        }
    });



    /* Adds a alliance, redirects to the alliance page after adding */

    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO characters (fname, lname, race, homeworld, association) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.race, req.body.homeworld, req.body.association];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('characters');
            }
        });
    });

    /* The URI that update data is sent to in order to update a alliance */

    router.put('/:id', function(req, res){
        console.log("IN PUT STATEMENT");

        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE characters SET fname=?, lname=?, race=?, homeworld=?, association=? WHERE id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.race, req.body.homeworld, req.body.association, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a alliance, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM characters WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
