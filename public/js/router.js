// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/tagListView',
    'views/categoryView',
    'models/categoryModel',
    'collections/categoryCollection'
], function($, _, Backbone, TagListView, CategoryView, CategoryModel, CategoryCollection) {

    var tagRouter = Backbone.Router.extend({
        routes: {
            "": "loadCategories"
        },
        loadCategories: function() {
            var categoryCollection = new CategoryCollection();
            var categoryView = new CategoryView({
                collection: categoryCollection,
                model: CategoryModel
            });
        }
    });

    var initialize = function() {
        var myTagRouter = new tagRouter();

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});