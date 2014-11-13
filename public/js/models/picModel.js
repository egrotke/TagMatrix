define([
  'backbone'
], function(Backbone) {
  
  var PicModel = Backbone.Model.extend({
    defaults: {
      title: '',
      description: '',
      tagList: [],
      tagName: '',
      likes: 0,
      views: 0
    }
  });

  return PicModel;

});
