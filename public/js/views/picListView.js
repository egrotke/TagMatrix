// Filename: views/picListView
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above,
  'collections/picCollection',
  'collections/categoryCollection',
  'text!templates/picTemplate.html',
  'text!templates/slideshowTemplate.html',
  'TM_Globals'

], function($, _, Backbone, PicCollection, CategoryCollection, PicTemplate, SlideTemplate, TM) {
  var PicListView = Backbone.View.extend({
    el: $('#pics'),
    events: {
      "click .pic-thumb .flip-container": "thumbClick",
      "mouseover .pic-thumb .flip-container": "thumbHover",
      "click .tags button": "tagClick",
      "click .like-icon": "likeClick"
    },
    initialize: function() {
      _.bindAll(this, 'render');
    },
    newSearch: function() {
      var that = this;
      $('.refresher').css('opacity', 1);
      $('.search-term, .search-count').css('opacity', 0.35);
      TM.slideIndex = 0;
      TM.page = 1;
      //this.collection.url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + TM.currentSearch + '&tagmode=' + TM.tagMode + '&perpage=80&sort=INTERESTINGNESS_DESC&page=' + TM.page + '&format=json&jsoncallback=?';
      this.collection.url = TM.rootURL + 'pics/?tags=' + TM.currentSearch + '&page=' + TM.page + '&perPage=' + TM.perPage + '&tagMode=' + TM.tagMode + '&sortBy=' + TM.sortBy + '&tagsOrText=' + TM.tagsOrText,


      this.collection.fetch({
        success: function(response, xhr) {
          //console.log(response);
          //console.log(response.url);
          that.render(true);
        },
        error: function(response, xhr) {
          console.log(response);
        }
      });
      $('#intro-logo').addClass('hidden');
    },
    addToSearch: function() {
      var that = this;
      console.log('addToSearch');
      //this.collection.url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + TM.currentSearch + '&tagmode=' + TM.tagMode + '&perpage=80&sort=INTERESTINGNESS_DESC&page=' + TM.page + '&format=json&jsoncallback=?';
      this.collection.url = TM.rootURL + 'pics/?tags=' + TM.currentSearch + '&page=' + TM.page + '&perPage=' + TM.perPage + '&tagMode=' + TM.tagMode + '&sortBy=' + TM.sortBy + '&tagsOrText=' + TM.tagsOrText,
      //_.bindAll(this, 'render');
      this.collection.fetch({
        // add: true,
        success: function(response, xhr) {
          //console.log(response);
          numReloads++;
          that.render(false);
        }
      });
    },

    /* Load new set of pics */
    render: function(newSearch) {
      var foundTag, slideshowTemplate, picsTemplate, tagsArray, descriptionNodes, thisDescription = false,
        currentNumSlides, picFarm, that = this;
      console.log('Render Pics');
      console.log(this.collection);
      this.collection.sort().each(function(pic, i) {


        if (pic.get("tags")) {
          tagsArray = pic.get("tags").split(' ');

          for (var j = 0; j < tagsArray.length; j++) {
            foundTag = that.options.tags.where({
              name: tagsArray[j]
            });
            if (foundTag.length > 0) { // Tag exists, add to count
              foundTag[0].attributes.count++;

            } else { // Add tag to array object
              that.options.tags.add({
                "name": tagsArray[j],
                "count": 1
              });
            }
            tagsArray[j] = '<button type="button" class="btn btn-xs btn-info">' + tagsArray[j] + "</button>"
          }
        }

        if (pic.attributes.description) {
          thisDescription = pic.attributes.description._content;
        } else {
          thisDescription = "";
        }
        if (newSearch) {
          numReloads = 0;
        }
        picFarm = "https://farm" + pic.attributes.farm + ".staticflickr.com/" + pic.attributes.server + "/" + pic.attributes.id + "_" + pic.attributes.secret;
        //console.log('index: ' + i);
        pic.set({
          // index: (i + 1) + ((page-1) * perPage),
          thumbURL: picFarm + "_s.jpg",
          smallURL: picFarm + "_n.jpg",
          bigURL: picFarm + "_b.jpg",
          bigUrlAttr: 'data-url="' + picFarm + '_b.jpg"',
          description: thisDescription,
          tagList: tagsArray,
          tagName: TM.currentSearch,
          views: pic.attributes.views,
          ownerURL: 'https://www.flickr.com/photos/' + pic.attributes.owner,
          flickrURL: 'https://www.flickr.com/photos/' + pic.attributes.owner + "/" + pic.attributes.flickrID
        });
        if (newSearch && i == 0) {
          that.options.tagView.setQueueItemPic(picFarm + "_n.jpg");
        }

      });

      currentNumSlides = TM.numSlides;
      picsTemplate = _.template(PicTemplate, {
        pics: this.collection.models,
        numSlides: currentNumSlides,
        tagName: TM.currentSearch,
        page: TM.page,
        perPage: TM.perPage
      });
      slideshowTemplate = _.template(SlideTemplate, {
        pics: this.collection.models,
        numSlides: currentNumSlides,
        page: TM.page,
        perPage: TM.perPage
      });

      if (newSearch) {
        this.$el.html(picsTemplate);
        $("#slideshow").html(slideshowTemplate).promise().done(function() {
          $('#bg-pic' + TM.slideIndex + '.bg-pic').css({
            display: 'block',
            opacity: 1
          });
          $('#slide-controls').css('opacity', 1);
        });
      } else {
        this.$el.append(picsTemplate);
        $("#slideshow").append(slideshowTemplate).promise().done(function() {
          that.scrollToBottom();
          $('#bg-pic' + TM.slideIndex + '.bg-pic').css({
            display: 'block',
            opacity: 1
          });
        });
      }

      TM.numSlides = $("#pics .pic-thumb").length;
      TM.slideNum = TM.slideIndex + 1;
      if (TM.numSlides > 0) {
        $('.search-count').text(TM.slideNum + "/" + TM.numSlides);
      } else {
        $('.search-count').text("");
      }
      $('.search-term .title').text(TM.currentSearch);


      if (newSearch) {
        $('#flickr-search input').val(TM.currentSearch);
        this.scrollTo(0, 0);
        this.initSlideshow(TM.currentSearch, false);
        //tagView.initialize();
        $('#load-more').css('display', 'block');
      }

      bottomScrolling = true;
      clearTimeout(TM.scrollingTimeout);
      TM.scrollingTimeout = setTimeout(function() {
        TM.bottomScrolling = false;
      }, 3000);

      $('.refresher').css('opacity', 0);
      $('.search-term, .search-count').css('opacity', 1);

    },
    thumbClick: function(e) { /* thumb click handler */
      e.preventDefault();
      $('.bg-pic').css({
        '-webkit-transition-duration': '.4s',
        'transition-duration': '.4s'
      });
      $('#pics .pic-thumb .flip-container').removeClass('selected');
      $(e.currentTarget).addClass('selected');
      TM.slideIndex = parseInt(e.currentTarget.attributes[1].value);
      this.stopSlideshow();
      this.changeBackground(TM.slideIndex);
    },
    thumbHover: function(e) { /* thumb click handler */
      var screenHeight = $(window).height(),
        thisDescription = e.currentTarget.nextSibling;
      e.preventDefault();
      if (e.clientY > screenHeight * 2 / 3) {
        $('#pics .pic-thumb .description').css({
          top: 'auto',
          bottom: 0
        });
      } else if (e.clientY < screenHeight * 1 / 3) {
        $('#pics .pic-thumb .description').css({
          top: 0,
          bottom: 'auto'
        });
      } else {
        $('#pics .pic-thumb .description').css({
          top: '-150px',
          bottom: 'auto'
        });
      }

    },
    tagClick: function(e) { /* Tag click handler */
      TM.currentSearch = e.currentTarget.innerHTML;
      e.preventDefault();
      this.options.tagView.addToTagQueue(TM.currentSearch);
      this.newSearch();
    },
    likeClick: function(e) {
      var tagName, tagView, thisModel, picURL, clickedEL = $(e.currentTarget);
      e.preventDefault();

      tagName = clickedEL.attr('data-name');
      picURL = clickedEL.attr('data-url');

      if (clickedEL.hasClass('liked')) {
        clickedEL.removeClass('liked');
        this.collection.where({
          'tagName': tagName
        })[0].set({
          'likes': 0
        });
      } else {
        clickedEL.addClass('liked');

        if (thisModel = this.collection.where({
          'tagName': tagName
        })[0]) {
          thisModel.set({
            'likes': 1
          });
        }
        this.options.tagView.setQueueItemPic(picURL);
      }
      if (thisModel = this.options.tags.where({
        'name': tagName
      })[0]) {
        thisModel.set({
          'picURL': picURL
        });
        thisModel.set({
          'hasPic': 'hasPic'
        });
        thisModel.saveTag();
      }
    },
    initSlideshow: function(searchTerm) {
      var lastSlide, thisModel,
        numSlide, bgPic, that = this;


      $('#tag-queue button').removeClass('selected');
      $('#tag-queue a.tag').removeClass('selected');
      $('#curated-tags button').removeClass('selected');
      $('#tag-queue button[data-category="' + searchTerm + '"]').addClass('selected');
      $('#tag-queue a[data-name="' + searchTerm + '"]').addClass('selected');
      $('#curated-tags button[data-category="' + searchTerm + '"]').addClass('selected');

      this.options.tagView.setQueueToSelected(searchTerm);

      if (this.options.tags.length) {
        this.options.tags.invoke('set', {
          "selected": ''
        });
      }
      if (thisModel = this.options.tags.where({
        'name': searchTerm
      })[0]) {
        thisModel.set({
          'selected': 'selected'
        });
      }

      if (TM.slideshowInterval) {
        clearInterval(TM.slideshowInterval);
      }

      numSlide = 1; //(TM.slideIndex > 0) ? TM.slideIndex : 1;
      if (TM.numSlides > 0) {
        $('.search-count').text(numSlide + "/" + TM.numSlides);
      }

      this.changeBackground(numSlide - 1);
      TM.slideIndex = 0;

      /*if (startIt){
        this.startSlideshow(numSlide);
      }*/

    },
    startSlideshow: function(numSlide) {
      var lastSlide, thisModel, bgPic, that = this;

      TM.slideshowOn = true;
      $('#slideshow .bg-pic').css({
        'transition-duration': '.5s',
        '-webkit-transition-duration': '.5s'
      });

      TM.numSlides = $("#pics .pic-thumb").length;
      if (numSlide < TM.numSlides) {
        numSlide++;
      } else {
        that.options.tagView.loadFavoritedTag();
      }
      that.changeBackground(numSlide);

      TM.slideshowInterval = setInterval(function() {
        var thother = that;

        TM.numSlides = $("#pics .pic-thumb").length;
        if (numSlide < TM.numSlides) {
          numSlide++;
        } else {
          thother.options.tagView.loadFavoritedTag();
        }
        thother.changeBackground(numSlide);

      }, 8000);

      $('#slideshow .bg-pic').css({
        'transition-duration': '5s',
        '-webkit-transition-duration': '5s'
      });
      $('#slideshow-button .fa-play').css('display', 'none');
      $('#slideshow-button .fa-pause').css('display', 'inline');
      $('#slideshow-button').removeClass('stopped');
    },
    stopSlideshow: function() {
      TM.slideshowOn = false;
      clearInterval(TM.slideshowInterval);
      $('#slideshow-button').addClass('stopped');
      $('#slideshow-button .fa-pause').css('display', 'none');
      $('#slideshow-button .fa-play').css('display', 'inline');
    },
    changeBackground: function(sentIndex) {
      var thisPic, nextIndex = sentIndex + 1;
      //sentIndex--;

      bgPic = 'url(' + $('#slideshow #bg-pic' + sentIndex).attr('data-url') + ')';
      $('#slideshow #bg-pic' + sentIndex).css('background-image', bgPic);

      bgPic = 'url(' + $('#slideshow #bg-pic' + nextIndex).attr('data-url') + ')';
      $('#slideshow #bg-pic' + nextIndex).css('background-image', bgPic);

      $('#slideshow .bg-pic').css({
        'opacity': 0,
        '-webkit-transform': 'scale(1,1)'
      });
      $('#slideshow #bg-pic' + sentIndex + '.bg-pic').css({
        'opacity': 1,
        '-webkit-transform': 'scale(1.2,1.2)'
      });

      $('#slideshow .pic-info').css('opacity', 0); //.css('-webkit-transform', 'scale(.5,.5)'); 
      $('#slideshow #pic-info' + sentIndex + '.pic-info').css('opacity', 1); //.css('-webkit-transform', 'scale(1,1)'); 
      $('.search-count').text(" : " + nextIndex + "/" + TM.numSlides);
      $('#pics .pic-thumb .flip-container').removeClass('selected');
      $('#pics .pic-thumb .flip-container[data-index="' + sentIndex + '"]').addClass('selected');

      TM.slideIndex = sentIndex;
    },
    scrollToBottom: function() {
      // Scroll
      $('html,body').animate({
          scrollTop: document.body.scrollHeight - 200
        },
        'slow');
      TM.bottomScrolling = true;
      clearTimeout(TM.scrollingTimeout);
      TM.scrollingTimeout = setTimeout(function() {
        bottomScrolling = false;
      }, 2000);
    },
    scrollTo: function(target, options, callback) {
      if (typeof options == 'function' && arguments.length == 2) {
        callback = options;
        options = target;
      }
      var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing',
      }, options);
      //return function() {
      var scrollPane = $("#pics");
      var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
      var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
      scrollPane.animate({
        scrollTop: scrollY
      }, parseInt(settings.duration), settings.easing, function() {
        if (typeof callback == 'function') {
          callback.call(this);
        }
      });
      //};
    }
  });
  return PicListView;
});