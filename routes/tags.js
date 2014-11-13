var mongo = require('mongodb');

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
	auto_reconnect: true
});

console.log('server: ' + server);

db = new Db('tagmatrixdb', server);


db.open(function(err, db) {
	if (!err) {
		console.log("Connected to 'tagmatrixdb' database");
		db.collection('tags', {
			strict: true
		}, function(err, collection) {
			if (err) {
				console.log("The 'tags' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});
	}
});

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving tag: ' + id);
	db.collection('tags', function(err, collection) {
		collection.findOne({
			'_id': new BSON.ObjectID(id)
		}, function(err, item) {
			res.send(item);
		});
	});
};

exports.findAll = function(req, res) {
	db.collection('tags', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.addTag = function(req, res) {
	var tag = req.body;
	console.log('Adding tags: ' + JSON.stringify(tag));
	db.collection('tags', function(err, collection) {
		collection.insert(tag, {
			safe: true
		}, function(err, result) {
			if (err) {
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				console.log('Success adding tag: '); // + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.updateTag = function(req, res) {
	var id = req.params.id;
	var tag = req.body;
	//tag._id = new ObjectID.createFromHexString( tag._id);
	delete tag._id;
	console.log('Updating tag: ' + id);
	console.log(JSON.stringify(tag));
	db.collection('tags', function(err, collection) {
		collection.update({
			'_id': new BSON.ObjectID(id)
		}, tag, {
			safe: true
		}, function(err, result) {
			if (err) {
				console.log('Error updating tag: ' + err);
				res.send({
					'error': 'An error has occurred'
				});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(tag);
			}
		});
	});
}

exports.deleteTag = function(req, res) {
	var id = req.params.id;
	console.log('Deleting tag: ' + id);
	db.collection('tags', function(err, collection) {
		collection.remove({
			'_id': new BSON.ObjectID(id)
		}, {
			safe: true
		}, function(err, result) {
			if (err) {
				res.send({
					'error': 'An error has occurred - ' + err
				});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

	var tags = [{
		name: "Ferguson",
		category: "News",
		year: "2014",
		month: "August"
	}, {
		name: "Robin Williams",
		category: "News",
		year: "2014",
		month: "August"
	}, {
		name: "Drought",
		category: "News",
		year: "2014",
		month: "August"
	}, {
		name: "Ebola Outbreak",
		category: "News",
		year: "2014",
		month: "August"
	}, {
		name: "PoliceBrutality",
		category: "News",
		year: "2014",
		month: "August"
	}];

	db.collection('tags', function(err, collection) {
		collection.insert(tags, {
			safe: true
		}, function(err, result) {});
	});

};