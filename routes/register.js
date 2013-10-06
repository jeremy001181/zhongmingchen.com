
/*
 * GET home page.
 */

var   dbclient = require('mongodb').MongoClient
	, format = require('util').format;

exports.get = function(req, res){
  res.render('register', { title: 'Register details' });
};

exports.post = function(req, res)
{	
	// save data to mongodb
	var _name = req.body.name.trim();
	
	if (!_name) 
		return;
	
	var idxName = _name ? _name.trim().toLowerCase().split(/\s+/) : null;
				
	dbclient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	    if(err) throw err;

	    var collection = db.collection('users');
	    
	    var user = idxName 
	    	? {
	    		"name": _name, 
	    		"idx_name": idxName
	    	  }
	    	: {"name": _name};
	    
	    collection.insert(user, function(err, docs) {

	      /*collection.count(function(err, count) {
	        console.log(format("count = %s", count));
	      });*/

	      // Locate all the entries using find
	      collection.find().toArray(function(err, results) {
	        console.dir(results);
	        // Let's close the db
	        db.close();
	        
	        //res.redirect('/account/' + _name);	        
	        res.redirect('/register');
	      });      
	    });
	  });
};