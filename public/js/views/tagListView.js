// Filename: views/tagListView
define([
  'jquery',
  'underscore',
  'backbone',
  'views/tagQueueListView',
  'views/recommendedListView',
  'models/tagModel',
  'collections/tagCollection',
  'collections/recommendedTagCollection',
  'views/tagListItemView',
  'collections/picCollection',
  'views/picListView',
  'headerHandlers',
  'TM_Globals'

], function($, _, Backbone, TagQueueListView, RecommendedListView, TagModel, TagCollection, RecommendedTagCollection, TagListItemView, PicCollection, PicListView, HeaderHandlers, TM) {

  var TagListView = Backbone.View.extend({
    el: $("#curated-tags"),
    tagName: 'ul',
    tagQueueListView: '',
    recommendedQueue: '',
    picListView: '',
    tagQueue: '',
    events: {
      "click .category-expander": "categoryExpander",
      "click .tag button": "tagClick",
      "click .tag.hasPic": "picClick",
      "click button.category": "headerClick",
      "click .rating": "addToQueue",
      "click .categoryRating": "addFullCategoryToQueue"
    },
    initialize: function() {
      var that = this,
        numTags = 0;

      this.collection.fetch({
        success: function(response, xhr) {
          var tagQueue;

          console.log('Success Fetching Tags: ' + response.length);

          numTags = response.length;
          that.render();
          that.initPicView();

          
        },
        error: function(response, xhr) {
          console.log('Error Fetching Tags: ' + response.url);
        }
      });

    },
    initPicView: function() {
      var picCollection;

      picCollection = new PicCollection();
      this.picListView = new PicListView({
        collection: picCollection,
        tags: this.collection,
        tagView: this,
        tagQueue: this.tagQueueListView.collection
      });
      this.initRecomendedView();
    },
    initRecomendedView: function() {
      this.recommendedQueue = new RecommendedTagCollection();
      this.recommendedListView = new RecommendedListView({
        collection: this.recommendedQueue,
        tags: this.collection,
        picView: this.picListView,
        tagView: this
      });
      this.recommendedListView.render();
      this.initTagQueueView();
    },

    initTagQueueView: function() {
      this.tagQueue = new TagCollection();
      this.tagQueueListView = new TagQueueListView({
        collection: this.tagQueue,
        tags: this.collection,
        tagView: this,
        picView: this.picListView
      });
      this.tagQueueListView.render();
      this.initHeaderHandlers();
    },
    setQueueToSelected: function(searchTerm) {
      if (this.tagQueue.length) {
        this.tagQueue.invoke('set', {
          "selected": ''
        });
        if (thisModel = this.tagQueue.where({
          'name': searchTerm
        })[0]) {
          thisModel.set({
            'selected': 'selected'
          });
        }
      }
    },
    setQueueItemPic: function(picUrl) {
      if (thisModel = this.tagQueue.where({
        'name': TM.currentSearch
      })[0]) {
        //if (thisModel.attributes.hasPic !== 'hasPic') {
          thisModel.set({
            'picURL': picUrl
          });
          thisModel.set({
            'hasPic': 'hasPic'
          });
        //}
      }
      if (thisModel = this.collection.where({
        'name': TM.currentSearch
      })[0]) {
        console.log(TM.currentSearch + ' : ' + thisModel.attributes.hasPic);
      //if (thisModel.attributes.hasPic !== 'hasPic') {
        console.log('set it');
          thisModel.set({
            'picURL': picUrl
          });
          thisModel.set({
            'hasPic': 'hasPic'
          });
        //}
      }

    },
    addToTagQueue: function(tagName){
      this.tagQueueListView.addToTagQueue(tagName);
    },
    addToRecommended: function(tagName){
      this.recommendedListView.addToRecommended(tagName);
    },
    initHeaderHandlers: function() {
      new HeaderHandlers(this.tagQueueListView, this.picListView, this);
    },
    render: function() {
      console.log('Render Tags');

      var theseItems, thisCat, $thisCat;
      _.each(this.options.categories.models, function(category) {
        theseItems = this.collection.where({
          'category': category.get('name')
        });

        thisCat = '#' + category.get('name').toLowerCase().replace(' ', '-');
        $thisCat = $(thisCat);
        _.each(theseItems, function(tag) {

          $thisCat.append(new TagListItemView({
            model: TagModel,
            tag: tag
          }).render().el);

          //tag.set('tagItemView', newTagListItemView);

        }, this);
      }, this);
      return this;
    },
    categoryExpander: function(e) { // Expander click handler 
      var clickedEL = $(e.currentTarget),
        thisCategory = clickedEL.attr('data-name'),
        theseItems = this.options.categories.where({
          'name': thisCategory
        });
      if (clickedEL.hasClass('expanded')) {
        clickedEL.parent().removeClass('expanded');
        clickedEL.parent().addClass('closed');
        clickedEL.removeClass('expanded');
        clickedEL.addClass('closed');
        $(theseItems)[0].set({
          'expanded': 'closed'
        });
      } else {
        clickedEL.parent().addClass('expanded');
        clickedEL.parent().removeClass('closed');
        clickedEL.addClass('expanded');
        clickedEL.removeClass('closed');
        $(theseItems)[0].set({
          'expanded': 'expanded'
        });
      }
    },
    loadFavoritedTag: function() {
      var thisIndex = 0,
        lastSearch,
        currentSearchModel;
      if (this.tagQueue.length && TM.currentSearch === this.tagQueue.models[0].attributes.name) {
        lastSearch = this.tagQueue.at(0).attributes.name;
        this.tagQueue.shift();
      }
      if (this.tagQueue.length > 1) {
        TM.currentSearch = this.tagQueue.at(0).attributes.name;
      } else {
        TM.currentSearch = this.getRandomTag();
        this.tagQueueListView.addToTagQueue(TM.currentSearch);
      }
      this.picListView.newSearch();

    },
    getRandomTag: function() {
      var randomObjNum = Math.floor((Math.random() * this.collection.length));
      return this.collection.models[randomObjNum].get('name');
    },
    tagClick: function(e) {
      TM.currentSearch = e.currentTarget.innerHTML;
      this.tagQueueListView.addToTagQueue(e.currentTarget.innerHTML);
      e.preventDefault();
      this.picListView.newSearch();
    },
    picClick: function(e) {
      var clickedEL = $(e.currentTarget);
      e.preventDefault();
      TM.currentSearch = clickedEL.children("span").attr('data-name');
      console.log(TM.currentSearch);
      this.tagQueueListView.addToTagQueue(TM.currentSearch);
      this.picListView.newSearch();
    },
    headerClick: function(e) { // Tag click handler 
      e.preventDefault();
      TM.currentSearch = e.currentTarget.innerHTML;
      this.tagQueueListView.addToTagQueue(TM.currentSearch);
      this.picListView.newSearch();
    },
    addToQueue: function(e) { // Tag click handler 
      var tagName, numLikes, thisItem, clickedEL = $(e.currentTarget);
      e.preventDefault();
      tagName = clickedEL.attr('data-name');

      console.log(tagName);
      if (clickedEL.hasClass('selected')) {
        thisItem = this.collection.where({
          'name': tagName
        })[0].set({
          'queued': 0
        });
        this.tagQueue.remove(this.tagQueue.find(function(model) {
          return model.get('name') == thisItem.attributes.name;
        }));

        clickedEL.removeClass('selected');
        clickedEL.children('i.fa').removeClass('fa-minus-circle');
        clickedEL.children('i.fa').addClass('fa-plus-circle');
      } else {
        console.log('not selected');
        thisItem = this.collection.where({
          'name': tagName
        })[0].set({
          'queued': 1
        });
        this.tagQueueListView.addToTagQueue(thisItem.attributes.name, tagName);
        console.log(thisItem.attributes.name + " : " + tagName);

        clickedEL.addClass('selected');
        clickedEL.children('i.fa').addClass('fa-minus-circle');
        clickedEL.children('i.fa').removeClass('fa-plus-circle');
        if (!TM.slideshowOn) {
          TM.currentSearch = tagName;
          this.picListView.newSearch();
        }

      }
    },
    addFullCategoryToQueue: function(e) { // Tag click handler 
      var tagName, numLikes, theseItems, clickedEL = $(e.currentTarget),
        that = this;
      e.preventDefault();
      categoryName = clickedEL.attr('data-name');
      theseItems = this.collection.where({
        'category': categoryName
      });

      if (clickedEL.hasClass('selected')) {
        clickedEL.removeClass('selected');
        clickedEL.parent().find('i.fa').removeClass('fa-minus-circle');
        clickedEL.parent().find('i.fa').addClass('fa-plus-circle');
        clickedEL.siblings().find('a span.rating').removeClass('selected');
        $(theseItems).each(function(index) {
          $(this)[0].set({
            'queued': 0
          });
          tagQueue.remove(tagQueue.find(function(model) {
            return model.get('name') == theseItems[index].attributes.name;
          }));
        });
      } else {
        clickedEL.addClass('selected');
        clickedEL.parent().find('i.fa').addClass('fa-minus-circle');
        clickedEL.parent().find('i.fa').removeClass('fa-plus-circle');
        clickedEL.siblings().find('a span.rating').addClass('selected');
        $(theseItems).each(function(index, tag) {
          $(this)[0].set({
            'queued': 1
          });
          that.tagQueueListView.addToTagQueue(tag.attributes.name, categoryName);
        });
        if (!TM.slideshowOn) {
          that.loadFavoritedTag();
        }
      }

    }
  });
  return TagListView;
});