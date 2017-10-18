var express = require('express');
var router = express.Router();

var request = require('request');
var convert = require('xml-js');

router.get('/:searchParam', function(req, res) {
    console.log('in the bgg route', req.params.searchParam);

    var base = 'https://www.boardgamegeek.com/xmlapi';
    var search = '/search?search=';
    var gameIn = req.params.searchParam;
    var type = '/boardgame/';
    var countReturn = '&exact=1';
    var idArray = [];
    var idString = '';
    var searchUrl = base + search + gameIn; 

    var search_options = {
        url: searchUrl,
        headers: {
            accepts: 'application/json'
        }
    };

    request(search_options, function(error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        // Changes XML to JSON
        let xml = body;
        let result = convert.xml2js(xml, {compact: false, spaces: 4});

        let gameArray = result.elements[0].elements;
        
        for (var i = 0; i < 15; i++) {
            objId = gameArray[i].attributes.objectid;
            idArray.push(objId);
        };
        idString = idArray.toString();

        var idUrl = base + type + idString + '?';
        var id_options = {
            url: idUrl,
            headers: {
                accepts: 'application/json'
            }
        };

        console.log('idString', idString);
        console.log('idUrl:', idUrl);

        request(id_options, function(error, response, body) {
            // console.log('error:', error);
            // console.log('statusCode:', response && response.statusCode);
            // console.log('body:', body);
    
            let xml = body;
            let idResult = convert.xml2js(xml, {compact: false, spaces: 4});
    
            console.log('idResult:', idResult);
            res.status(200).send(idResult);
        });
    });
});

module.exports = router;