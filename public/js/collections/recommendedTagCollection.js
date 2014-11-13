define([
  'jquery',
  'underscore',
  'backbone',
  'models/tagModel'
], function($, _, Backbone, TagModel){
  var TagCollection = Backbone.Collection.extend({
        url: 'js/json/recommendedSeedData.json', //url: '../tags',
        model: TagModel
    });

 
  return TagCollection;
});
