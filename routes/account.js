
/*
 * GET home page.
 */

var   dbclient = require('mongodb').MongoClient
	, format = require('util').format;

exports.get = function(req, res)
{
	var _name = req.params.name;
	// save data to mongodb	
	dbclient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	    if(err) throw err;

	    var collection = db.collection('users');
	    

	      // Locate all the entries using find
	      collection.find({name:_name}).toArray(function(err, results) {
	        // Let's close the db
	        db.close();
	        
	        res.send(results);
	      });      
	});
	
  
};