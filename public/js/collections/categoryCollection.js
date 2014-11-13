define([
  'jquery',
  'underscore',
  'backbone',
  'models/categoryModel'
], function($, _, Backbone, CategoryModel){
      var CategoryCollection = Backbone.Collection.extend({
        url: 'js/json/seedCategories.json', 
        model: CategoryModel,
        comparator: function(item) {
            return item.get("queued");
        }
    });

 
  return CategoryCollection;
});
