var async = require('async');
var http = require('http');
var ds = require('../datasources.json');
var config = require('../config.json');
const io = require('socket.io')();

module.exports = function(app) {

    var game = app.models.game;

    //listen for connections
    io.listen(8000);
    console.log('listening on port 8000');

    io.on('connection', (client) => {
        client.on('subscribeToTimer', (interval) => {
            console.log('client is subscribing to timer with interval ', interval);
            setInterval(() => {
                client.emit('timer', new Date());
            }, interval);
        });
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
