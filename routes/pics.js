exports.findById = function(req, res) {
    var id = req.params.id;
    //console.log('Retrieving pic: ' + id);
    db.collection('pics', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {

	var queryTags = (req.query.tags) ? req.query.tags : 'canyons',
		queryTagMode = (req.query.tagmode) ? req.query.tagmode : 'all',
		queryPage = (req.query.page) ? req.query.page : 1,
		queryPerPage = (req.query.perPage) ? req.query.perPage : 10,
		querySortBy = (req.query.sortBy) ? req.query.sortBy : '';

	var Flickr = require("flickrapi"),
		flickrOptions = {
		  api_key: "XXXXXXXXXXX",
		  secret: 'XXXXXX'
	};

	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
	  	flickr.photos.search({
		  tags: queryTags,
		  tagmode: queryTagMode,
		  page: queryPage,
		  per_page: queryPerPage,
		  extras: 'tags,url_m,owner_name,views,date_taken,description',
		  format:'json',
		  sortBy: querySortBy,
	      nojsoncallback:1
		}, function(err, data) {
		  if(err) { throw new Error(err); }
		  	//console.log(data);
		  	res.send(data.photos.photo);
		});
	});
}

