var Guid = require('guid');
'use strict';

module.exports = function(Game) {

	//post game hook
    Game.observe('before save', function(ctx, next, game) {
    	//set date modified
        var currentDate = new Date();
        if (ctx.isNewInstance == true) {
            ctx.instance.dateCreated = currentDate;
        }

        //set key
        var guid = Guid.create();
        ctx.instance.key = guid;

    	console.log('Making new Game with key', ctx.instance.key);
        next();
    });
};
