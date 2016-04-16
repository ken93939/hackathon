var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback=require('loopback');

module.exports = function(Activity) {

	Activity.addActivity = function(data, cb){
		var ctx=loopback.getCurrentContext();
		// console.log(ctx);
		var accessToken=ctx.get('accessToken');
		// console.log(accessToken);
		var currentUser = ctx && ctx.get('currentUser');
		
		data.memberId = currentUser.id;
		data.time = new Date();
		currentUser.locations(function(err, loc){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				if (loc != null){
					data.location = loc.location;
					Activity.create(data, function(err, act){
						if (err){
							console.log(err);
							cn(err, null);
						} else{
							console.log("Activity add: ", act);
							cb(null, act);
						}
					});
				} else{
					cb(null, null);
				}
			}
		});

		
	}

	Activity.possibleMatch = function(data, cb){
		var ctx=loopback.getCurrentContext();
		// console.log(ctx);
		var accessToken=ctx.get('accessToken');
		// console.log(accessToken);
		var currentUser = ctx && ctx.get('currentUser');

		currentUser.locations(function(err, loc){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				var filter = {
					"where": {
						"location": {"near": loc.location}, 
						"memberId": {"neq": currentUser.id}, 
						"name" : data.name
					}
				};

				Activity.find(filter, function(err, acts){
					if (err){
						console.log(err);
						cb(err, null);
					} else{
						console.log(acts);
						var newActs = [];
						Activity.getPossibleMatchedInfo(acts, 0, newActs, function(err, returnActs){
							if (err){
								console.log(err);
								cb(err, null);
							} else{
								cb(null, returnActs);
							}
						});
						
					}
				});
			}
		});
	}

	Activity.getPossibleMatchedInfo = function(acts, index, newActs, cb){
		if (index >= acts.length){
			cb(null, newActs);
		} else{
			var Member = app.models.member;
			Member.findById(acts[index].memberId, function(err, mem){
				if (err){
					console.log(err);
					cb(err, null);
				} else{
					var obj = acts[index];
					obj.picture = mem.picture;
					newActs.push(obj);
					Activity.getPossibleMatchedInfo(acts, index+1, newActs, cb);
				}
			});
		}
	}

	Activity.remoteMethod(
		'addActivity',
		{
			http: {path: '/addActivity', verb: 'post'},
			accepts:{arg: 'data', type: 'object', http:{source:'body'}},
			returns: {arg: 'data', type: 'sobject'}
		}
	);

	Activity.remoteMethod(
		'possibleMatch',
		{
			http: {path: '/possibleMatch', verb: 'post'},
			accepts:{arg: 'data', type: 'object', http:{source:'body'}},
			returns: {arg: 'data', type: 'sobject'}
		}
	);
};
