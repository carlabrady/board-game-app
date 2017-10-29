var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

var request = require('request');

router.get('/wishlist/:searchParam', function(req, res) {
    console.log('in the wishlist route', req.params.searchParam);
    let searchParam = req.params.searchParam;

    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        }//END if err
        else{
            client.query("SELECT * FROM games JOIN users_games ON games.id=users_games.games_id JOIN users ON users_games.users_id=users.id WHERE users_games.wants = true AND users_id=$1;", [searchParam], function (quErr, resObj){
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

router.get('/:searchParam', function(req, res) {
    console.log('in the userGames route', req.params.searchParam);
    let searchParam = req.params.searchParam;

    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        }//END if err
        else{
            client.query("SELECT * FROM games JOIN users_games ON games.id=users_games.games_id JOIN users ON users_games.users_id=users.id WHERE users_games.owned = true AND users_id=$1;", [searchParam], function (quErr, resObj){
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

router.post('/wish', function(req, res) {
    console.log('in the userGames route', req.body);
    var userId = req.body.users_id;    
    var gameId = req.body.id;
    var userGameId = req.body.games_id;
    console.log('post game route with games_id:', userGameId);
    console.log('post game route with id:', gameId);
    
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else if (userGameId) {
            console.log('Already in db');
            var delQuery = "DELETE FROM users_games WHERE games_id=$1";
            client.query(delQuery, [userGameId], function (quErr, resObj){
                done();
                if (quErr) {
                    console.log('query error', quErr);
                    res.sendStatus(500); 
                } else {
                    res.sendStatus(200);
                }//END else
            });//END client.query
        } else {
            console.log('Not already in db');
            let query = "INSERT INTO users_games (users_id, games_id, owned, wants) VALUES ( $1, $2, false, true);";
            client.query(query, [userId, gameId], function (quErr, resObj){
                done();
                if (quErr) {
                    console.log('query error', quErr);
                    res.sendStatus(500); 
                } else {
                    res.sendStatus(200);
                }//END else
            });//END client.query
        }//END else no err
    })//END pool connect
});

router.post('/', function(req, res) {
    console.log('in the userGames route', req.body);
    var userId = req.body.users_id;    
    var gameId = req.body.id;
    var userGameId = req.body.games_id;
    console.log('posr game route with games_id:', userGameId);
    console.log('post game route with id:', gameId);
    
    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        } else if (userGameId) {
            console.log('Already in db');
            var delQuery = "DELETE FROM users_games WHERE games_id=$1";
            client.query(delQuery, [userGameId], function (quErr, resObj){
                done();
                if (quErr) {
                    console.log('query error', quErr);
                    res.sendStatus(500); 
                } else {
                    res.sendStatus(200);
                }//END else
            });//END client.query
        } else {
            console.log('Not already in db');
            let query = "INSERT INTO users_games (users_id, games_id, owned, wants) VALUES ( $1, $2, true, false);";
            client.query(query, [userId, gameId], function (quErr, resObj){
                done();
                if (quErr) {
                    console.log('query error', quErr);
                    res.sendStatus(500); 
                } else {
                    res.sendStatus(200);
                }//END else
            });//END client.query
        }//END else no err
    })//END pool connect
});

module.exports = router;