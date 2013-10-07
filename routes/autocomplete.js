/*
 * GET home page.
 */

var dbclient = require('mongodb').MongoClient, format = require('util').format;

exports.get = function(req, res) {

	var term = req.query.term.toLowerCase();

	if (!term)
		return;

	dbclient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
		if (err)
			throw err;

		var collection = db.collection('users');

		// Locate all the entries using find
		collection.find({
			name : {
				'$regex' : new RegExp("\\b" + term, "ig")
			}
		}, {
			_id : 0,
			name : 1
		}).limit(6).toArray(function(err, results) {
			// Let's close the db
			db.close();

			res.send(results.map(function(val) {
				return val.name;
			}));
		});

	});
};