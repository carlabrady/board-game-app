var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

var request = require('request');

router.post('/', function(req, res) {
    var genreArr = req.body.list
    console.log('in the searchGenre route', genreArr);
    var genreQuery = "SELECT * FROM games FULL OUTER JOIN users_games ON games.id=users_games.games_id WHERE"
    
    for (var i = 0; i < genreArr.length; i++) {
        if (i !== genreArr.length - 1) {
            console.log('iterate');
            var subStr = " games.category SIMILAR TO '%" + genreArr[i] + "%' AND";
            genreQuery = genreQuery + subStr;
        } else {
            var subStr = " games.category SIMILAR TO '%" + genreArr[i] + "%';";
            genreQuery = genreQuery + subStr;
            console.log('checking last value', genreQuery);
        };       
    };
    
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        }//END if err
        else{
            client.query(genreQuery, function (quErr, resObj){
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