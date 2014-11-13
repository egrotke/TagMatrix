// Filename: views/categoryView
define([
  'jquery',
  'underscore',
  'backbone',
  'views/tagListView',
  'collections/tagCollection',
  'text!templates/categoryTemplate.html'

], function($, _, Backbone, TagListView, TagCollection, CategoryTemplate) {

  var CategoryView = Backbone.View.extend({
    el: $("#curated-tags"),
    template: _.template(CategoryTemplate),
    initialize: function() {
      var that = this;
      // this.model.bind("change", this.render, this);



      this.collection.fetch({
        success: function(response, xhr) {
          console.log(response);
          console.log('Success Fetching Categories: ' + response.length);
          that.render();
        },
        error: function(response, xhr) {
          console.log('Error Fetching Categories: ' + response.url);
        }
      });

    },
    render: function() {
      var tagListView, tagCollection;

      this.$el.html(this.template({
        categories: this.collection.models
      }));
      tagCollection = new TagCollection();
      tagListView = new TagListView({
        categories: this.collection,
        collection: tagCollection
      });
    },
    save: function() {
      if (this.model.isNew()) {
        categories.create(this.model);
      } else {
        this.model.save(null, {
          success: function(model, response) {
            console.log('Saved: ' + model);
          },
          error: function(model, response) {
            console.log('Error: ');
            console.log(response.responseText);
          }
        });
      }
      return false;
    }
  });
  return CategoryView;
});