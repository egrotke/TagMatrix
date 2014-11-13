// Filename: views/tagListView
define([
        'jquery',
        'underscore',
        'backbone',
        'collections/tagCollection',
        'text!templates/tagListItemTemplate.html' 

], function($, _, Backbone,  TagCollection, TagListItemTemplate) {
var TagListItemView = Backbone.View.extend({
    tagName:"li",
 
    template:_.template(TagListItemTemplate),
 
    initialize:function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },
 
    render:function (eventName) {
        $(this.el).html(this.template({tag:this.options.tag}));
        console.log('Render Tag: ' + this.options.tag);

        return this;
    },
 
    close:function () {
        $(this.el).unbind();
        $(this.el).remove();
    }
});

  return TagListItemView;
});