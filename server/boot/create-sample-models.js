var async = require('async');
var http = require('http');
var ds = require('../datasources.json');
var config = require('../config.json');
const io = require('socket.io')();
var players = [];

module.exports = function(app) {

    var game = app.models.game;

    //listen for connections
    io.listen(8000);
    console.log('listening on port 8000');

    io.on('connection', (client) => {
    	//check to see if too many players are connected
    	if(players.length > 1) {
    		console.log("3rd browser attempting to connect. disconnectiong client...");
    		client.disconnect(1);

    	} else {
    		players.push(client);
	    	console.log('user', players.length, 'has connected');

	        client.on('sendToServer', (data) => {
	            console.log('client made a move:', data);
	            io.emit('move', data);
	        });
	    }
    });


    //migrate models
    app.dataSources.heroku.automigrate(['game'], function(err) {
        if (err) throw err;
    });

}


// //Creating fixture data pattern:
//        function createXXX(X, X, callback) {
//            XXX.create({
//                X: X,
//                X: X, 
//            }, function(err, XXX) {
//                callback(null, XXX);
//            });
//        }

//        function createXXXs(cb) {
//            async.series([
//                function(next) { createXXX(X, X, next); },
//                // V
//            ], function(err, result) {
//                if (err) {
//                    cb(err);
//                } else {
//                    cb(null, result);
//                }
//            });
//        }

//        async.series([
//            function(next) { createXXXs(next); },
//        ], function(err, result) {
//            if (err) {} else {}
//        });
