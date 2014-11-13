define([
  'jquery',
  'underscore',
  'backbone',
  'models/tagModel'
], function($, _, Backbone, TagModel){
  var TagCollection = Backbone.Collection.extend({
        url: 'js/json/seedData.json', //url: '../tags',
        model: TagModel,
        comparator: function(item) {
            return item.get("likes");
        }
    });

 
  return TagCollection;
});
