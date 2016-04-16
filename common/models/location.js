var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback=require('loopback');

module.exports = function(Location) {

	Location.addLocation = function(data, cb){
		console.log(data);
		var ctx=loopback.getCurrentContext();
		// console.log(ctx);
		var accessToken=ctx.get('accessToken');
		// console.log(accessToken);
		var currentUser = ctx && ctx.get('currentUser');

		var locData = {};

		locData.memberId = currentUser.id;
		locData.time = new Date();
		locData.active = true;
		locData.location = data;

		Location.create(locData, function(err, loc){
			if (err){
				console.log(err);
				cn(err, null);
			} else{
				console.log("Location add: ", loc);
				currentUser.updateAttributes({"locationId": loc.id}, function(err, mem){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						cb(null, loc);
					}
				})
				
			}
		});
	}

	Location.remoteMethod(
		'addLocation',
		{
			http: {path: '/addLocation', verb: 'post'},
			accepts:{arg: 'data', type: 'object', http:{source:'body'}},
			returns: {arg: 'data', type: 'sobject'}
		}
	);

};
