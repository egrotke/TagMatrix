exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving pic: ' + id);
    db.collection('pics', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {

	//var fullUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=78fc47e887da553c5b397c61822c5854
	//&tags=' + req.query.tags;
	// . '&sort=' . $sortBy .'&content_type=1&media=photos&page=' . $page . '&per_page=' . $perPage . '&tagmode=' . $tagmode .'&extras=tags,url_m,owner_name,views,date_taken,description&format=json&nojsoncallback=1';

	var http = require("http"),
		queryTags = (req.query.tags) ? req.query.tags : 'ass',
		queryTagMode = (req.query.tagmode) ? req.query.tagmode : 'all';
	


	var options = {
	    host: 'api.flickr.com',
	    path: '/services/rest',
	    method: 'flickr.photos.search',
	    api_key: '78fc47e887da553c5b397c61822c5854',
	    tags: queryTags,
	    tagmode: queryTagMode,
	    format:'json',
	    nojsoncallback:1
	};
	console.log(options);
	http.get(options, function (http_res) {
	    // initialize the container for our data
	    var data = "";

	    // this event fires many times, each time collecting another piece of the response
	    http_res.on("data", function (chunk) {
	        // append this chunk to our growing `data` var
	        data += chunk;
	    });

	    // this event fires *one* time, after all the `data` events/chunks have been gathered
	    http_res.on("end", function () {
	        // you can use res.send instead of console.log to output via express
	        //console.log(data);
	        res.send(data);
	    }).on('error', function(e) {
	  		console.log("Got error: " + e.message);
		});
	});
};