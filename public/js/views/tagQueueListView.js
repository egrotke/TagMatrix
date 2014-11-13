// Filename: views/TagQueueListView
define([
  'jquery',
  'underscore',
  'backbone',
  'TM_Globals',
  'text!templates/tagQueueListTemplate.html'

], function($, _, Backbone, TM, TagQueueListTemplate) {
  var TagQueueListView = Backbone.View.extend({
    el: $("#tag-queue"),
    events: {
      "click .tag button": "tagClick",
      "click .rating": "minusClick",
      "click .like-icon": "likeClick",
      "click .tag.hasPic": "picClick",
      "click #slideshow-button": "playPauseClick",
      "click #slideshow-next": "nextSlideshowClick",
      "click .queue-expander": "queueExpander"
    },
    initialize: function() {
      this.collection.reset();
      /*if (this.options.tags.length > 0) {
        this.collection.add(this.options.tags.where({
          'queued': 1
        }));
      }*/
      this.collection.reset(this.collection.shuffle(), {
        silent: true
      });
      this.collection.bind("change", this.render, this);
      this.collection.bind("add", this.render, this);
      this.collection.bind("remove", this.render, this);
    },
    render: function() {
      var tagQueueTemplate;

      console.log('Render Queue');

      tagQueueTemplate = _.template(TagQueueListTemplate);
      this.$el.html(tagQueueTemplate({
        tagQueue: this.collection.models
      }));
    },
    addToTagQueue: function(tagName, categorySent) {
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
      var clickedEL = $(e.currentTarget);
      e.preventDefault();

      TM.currentSearch = e.currentTarget.innerHTML;
      this.options.picView.newSearch();
    },
    picClick: function(e) {
      var clickedEL = $(e.currentTarget);
      e.preventDefault();
      console.log(e.currentTarget);
      if ($(e.currentTarget).hasClass('like-icon')) {
        return;
      }
      TM.currentSearch = clickedEL.attr('data-name');
      this.options.picView.newSearch();
    },
    likeClick: function(e) {
      var tagName, thisTagModel, curatedTagModel, clickedEL = $(e.currentTarget);
      e.preventDefault();

      tagName = clickedEL.attr('data-name');
      this.options.tagView.addToRecommended(tagName);
      curatedTagModel = this.options.tags.where({
        'name': tagName
      })[0];
      thisTagModel = this.collection.where({
        'name': tagName
      })[0];

      if (clickedEL.hasClass('liked')) {
        clickedEL.removeClass('liked');
        curatedTagModel.set({
          'likes': 0
        });
        thisTagModel.set({
          'likes': 0
        });
      } else {
        clickedEL.addClass('liked');
        curatedTagModel.set({
          'likes': 1
        });
        thisTagModel.set({
          'likes': 1
        });
      }
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
        this.options.tagView.loadFavoritedTag();
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

    },
    playPauseClick: function(e) {
      clickedEL = $(e.currentTarget);
      console.log(clickedEL);
      if (clickedEL.hasClass('stopped')) {
        this.options.picView.initSlideshow(TM.currentSearch, true);
        clickedEL.removeClass('stopped');
      } else {
        this.options.picView.stopSlideshow();
        clickedEL.addClass('stopped');
      }

    },
    nextSlideshowClick: function(e) {
      this.options.curatedTagView.loadFavoritedTag();
    }
  });
  return TagQueueListView;
});