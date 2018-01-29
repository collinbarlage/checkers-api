var async = require('async');
var http = require('http');
var ds = require('../datasources.json');
var config = require('../config.json');

module.exports = function(app) {

    var Game = app.models.game;

    //app.dataSources.heroku.autoupdate(['ACL', 'AccessToken'], function(err) {
    //  if (err) throw err;
    //});

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
