// Filename: views/recommendedListView
define([
  'jquery',
  'underscore',
  'backbone',
  'TM_Globals',
  'text!templates/recommendedListTemplate.html'

], function($, _, Backbone, TM, RecommendedListTemplate) {
  var TagQueueListView = Backbone.View.extend({
    el: $("#recommended-tags"),
    events: {
      "click .tag button": "tagClick",
      "click .rating": "minusClick",
      "click .like-icon": "likeClick",
      "click .tag.hasPic": "picClick",
      "click .queue-expander": "queueExpander"
    },
    initialize: function() {
      var that = this;

      this.collection.fetch({
        success: function(response, xhr) {
          var tagQueue;

          console.log('Success Fetching Recommended Tags: ' + response.length);
          this.collection.reset(this.collection.shuffle(), {
            silent: true
          });

          numTags = response.length;
          that.render();
        },
        error: function(response, xhr) {
          console.log('Error Fetching Tags: ' + response.url);
          if (this.options.tags.length > 0) {
            this.collection.add(this.options.tags.where({
              'likes': 1
            }));

          }
        }
      });

      this.collection.bind("change", this.render, this);
      this.collection.bind("add", this.render, this);
      this.collection.bind("remove", this.render, this);

      $('.tagsButton').on('mouseup', function(e) {
        console.log(JSON.stringify(that.collection.toJSON(), undefined, 2));
      });
    },
    render: function() {
      var recommendedTemplate;


      recommendedTemplate = _.template(RecommendedListTemplate);
      this.$el.html(recommendedTemplate({
        recommended: this.collection.models
      }));
    },
    addToRecommended: function(tagName, categorySent) {
      var tagExists, existingTag;


      categorySent = (categorySent) ? categorySent : 'related';
      tagExists = this.collection.where({
        'name': tagName
      })[0];
      existingTag = this.options.tags.where({
        'name': tagName
      });

      if (!tagExists) {
        if (existingTag.length > 0) {
          this.collection.add(existingTag, {
            at: 0
          });
        } else {
          this.collection.add({
            name: tagName,
            queued: 1,
            category: categorySent
          }, {
            at: 0
          });
        }
      }
    },
    tagClick: function(e) {
      var clickedEL = $(e.currentTarget),
        tagName;
      e.preventDefault();

      tagName = e.currentTarget.innerHTML;
      TM.currentSearch = tagName;
      this.options.tagView.addToTagQueue(TM.currentSearch);
      this.collection.remove(this.collection.find(function(model) {
        return model.get('name') == tagName;
      }));
      this.options.picView.newSearch();
    },
    picClick: function(e) {
      var tagName, clickedEL = $(e.currentTarget);
      e.preventDefault();
      if ($(e.currentTarget).hasClass('like-icon')) {
        return;
      }
      tagName = clickedEL.attr('data-name');
      TM.currentSearch = tagName;
      this.options.tagView.addToTagQueue(TM.currentSearch);
      this.collection.remove(this.collection.find(function(model) {
        return model.get('name') == tagName;
      }));
      this.options.picView.newSearch();

    },
    likeClick: function(e) {
      var tagName, thisTagModel, curatedTagModel, clickedEL = $(e.currentTarget);
      e.preventDefault();

      tagName = clickedEL.attr('data-name');
      curatedTagModel = this.options.tags.where({
        'name': tagName
      })[0];
      thisTagModel = this.collection.where({
        'name': tagName
      })[0];


      clickedEL.removeClass('liked');
      curatedTagModel.set({
        'likes': 0
      });
      thisTagModel.set({
        'likes': 0
      });
      this.collection.remove(this.collection.find(function(model) {
        return model.get('name') == tagName;
      }));
    },
    minusClick: function(e) { /* Tag click handler */
      var numqueued, clickedEL = $(e.currentTarget);
      tagName = clickedEL.attr('data-name'),
      dataIndex = clickedEL.attr('data-index'),
      thisItem = this.options.tags.where({
        'name': tagName
      })[0];
      e.preventDefault();

      this.collection.remove(this.collection.find(function(model) {
        return model.get('name') == tagName;
      }));

      if (tagName === TM.currentSearch) {
        this.options.curatedTagView.loadFavoritedTag();
      }

      // Update Curated Tags
      thisItem.set({
        'queued': 0
      });
      curatedTagEL = $('#curated-tags .rating[data-name="' + tagName + '"]')
      curatedTagEL.removeClass('selected');
      curatedTagEL.children('i.fa').removeClass('fa-minus-circle');
      curatedTagEL.children('i.fa').addClass('fa-plus-circle');

    },
    queueExpander: function(e) { /* Expander click handler */
      var clickedEL = $(e.currentTarget);
      console.log(clickedEL);
      if (clickedEL.hasClass('expanded')) {
        clickedEL.parent().parent().removeClass('expanded');
        clickedEL.parent().parent().addClass('closed');
        clickedEL.removeClass('expanded');
        clickedEL.addClass('closed');
      } else {
        clickedEL.parent().parent().addClass('expanded');
        clickedEL.parent().parent().removeClass('closed');
        clickedEL.addClass('expanded');
        clickedEL.removeClass('closed');
      }
    }
  });
  return TagQueueListView;
});