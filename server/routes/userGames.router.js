var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

var request = require('request');

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
            client.query("SELECT * FROM games JOIN users_games ON games.id=users_games.games_id JOIN users ON users_games.users_id=users.id;", function (quErr, resObj){
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