var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

var request = require('request');

router.get('/:searchParam', function(req, res) {
    console.log('in the searchGenre route', req.param.searchParam);
    var searchParam = req.params.searchParam;
    console.log('in the searchGenre route', searchParam);
    var genreQuery = "SELECT * FROM games FULL OUTER JOIN users_games ON games.id=users_games.games_id WHERE games.mechanic SIMILAR TO ($1) OR games.category SIMILAR TO ($1);"
    
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        }//END if err
        else{
            client.query(genreQuery,['%' + searchParam + '%'], function (quErr, resObj){
                done();
                if(quErr){
                    console.log('query error', quErr);
                    res.sendStatus(500); 
                }//END if quErr
                else{
                    res.send(resObj.rows);
                }//END else
            });//END client.query
         }//END else no err
    })//END pool connect
});

module.exports = router;