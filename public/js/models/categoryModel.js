define([
  'backbone'
], function(Backbone) {
  
     var CategoryModel = Backbone.Model.extend({
        url: '../categories',
        defaults: {
            name: '',
            queued: 0,
            expanded: 'closed'
        }
    });

  return CategoryModel;

});
