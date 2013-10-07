
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
	
	dbclient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	    
		if(err) throw err;

	    var collection = db.collection('users');
	    var user = {"name": _name};
	    
	    collection.insert(user, function(err, docs) {

	      db.close();
	      //res.redirect('/account/' + _name);
	      res.redirect('/register');
	    });
	  });
};