var path = require('path');
var app = require(path.resolve(__dirname, '../../server/server'));
var loopback=require('loopback');

module.exports = function(Member) {

	Member.getInfo = function(cb){
		var ctx=loopback.getCurrentContext();
		// console.log(ctx);
		var accessToken=ctx.get('accessToken');
		// console.log(accessToken);
		var currentUser = ctx && ctx.get('currentUser');

		Member.findById(currentUser.id, function(err, mem){
			if (err){
				console.log(err);
				cb(err, null);
			} else{
				cb(null, mem);
			}
		});
	}

	Member.remoteMethod(
		'getInfo',
		{
			http: {path: '/getInfo', verb: 'get'},
			returns: {arg: 'data', type: 'sobject'}
		}
	);

};
