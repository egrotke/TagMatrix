// Filename: headerHandlers
define([
    'jquery',
    'lib/bootstrap-switch',
    'TM_Globals'
  ], function($, BootstrapSwitch, TM) {

    var HeaderHandlers = function(tagQueueView, picView, tagListView) {

      $("[name='sort-checkbox']").bootstrapSwitch();
      $("[name='sortdir-checkbox']").bootstrapSwitch();
      $("[name='tagmode-checkbox']").bootstrapSwitch();
      /* Search box handler */
      $('#flickr-search').on('submit', function(e) {
        TM.previousSearch = TM.currentSearch;
        TM.currentSearch = $("input:first").val();
        tagQueueView.addToTagQueue(TM.currentSearch);
        e.preventDefault();
        picView.newSearch();
      });

      /* Load More handler */
      $('#load-more').on('mouseup', function(e) {
        TM.page++;
        picView.addToSearch();
      });


      $('#search-icon .searchButton').on('mouseup', function(e) {
        var mouseupedEL = $(this);
        if (mouseupedEL.hasClass('selected')) {
          mouseupedEL.removeClass('selected');
          $('#flickr-search').addClass('reveal');
        } else {
          mouseupedEL.addClass('selected');
          $('#flickr-search').removeClass('reveal');
        }
      });

      $('.thumbButton').on('mouseup', function(e) {
        var mouseupedEL = $(this);
        if (mouseupedEL.hasClass('selected')) {
          mouseupedEL.removeClass('selected');
          $('#pics').css('left', '-250px'); //.addClass('hidden');
        } else {
          mouseupedEL.addClass('selected');
          $('#pics').css('left', '0px'); //.removeClass('hidden');
        }
      });

      $('.tagsButton').on('mouseup', function(e) {
        var mouseupedEL = $(this);
        if (mouseupedEL.hasClass('selected')) {
          mouseupedEL.removeClass('selected');
          $('#tags').css('right', '20px'); //.addClass('hidden');
        } else {
          mouseupedEL.addClass('selected');
          $('#tags').css('right', '-400px'); //.removeClass('hidden');
        }
      });
      $('.boltButton').on('mouseup', function(e) {
        var mouseupedEL = $(this);
        if (mouseupedEL.hasClass('selected')) {
          mouseupedEL.removeClass('selected');
          $('.tagsButton').addClass('selected');
          $('#pics').css('left', '-250px');
          $('#tags').css('right', '-400px');
          $('#slide-controls, .searchButton, .tagsButton, .boltButton').css('opacity', '.35');
          $('#slideshow .pic-info').css('bottom', '-300px');
          if ($('#flickr-search').hasClass('reveal')) {
            $('.searchButton').addClass('selected');
            $('#flickr-search').removeClass('reveal');
          }
        } else {
          mouseupedEL.addClass('selected');
          $('.tagsButton').removeClass('selected');
          $('#pics').css('left', '0px');
          $('#tags').css('right', '20px');
          $('#slide-controls, .searchButton, .tagsButton, .boltButton').css('opacity', '1');
          $('#slideshow .pic-info').css('bottom', '0px');
        }
      });
      $('.infoButton').on('mouseup', function(e) {
        var mouseupedEL = $(this);
        if (mouseupedEL.hasClass('selected')) {
          mouseupedEL.removeClass('selected');
          $('#slideshow .pic-info').addClass('hidden');
        } else {
          mouseupedEL.addClass('selected');
          $('#slideshow .pic-info').removeClass('hidden');
        }
      });
      $('#intro-logo').on('mouseup', function(e) {
        var mouseupedEL = $(this);
        $(this).addClass('hidden');
        TM.currentSearch = tagListView.getRandomTag();
        tagQueueView.addToTagQueue(TM.currentSearch);
        TM.page = 1;
        picView.newSearch();
      });

      $('#slideshow-button').on('mouseup', function(e) {
        mouseupedEL = $(e.currentTarget);
        $('#slide-controls').css('opacity', '1');
        if (mouseupedEL.hasClass('stopped')) {
          picView.startSlideshow(TM.slideIndex);
        } else {
          picView.stopSlideshow();
        }

      });
      $('#slideshow-next').on('mouseup', function(e) {
        $('#slide-controls').css('opacity', '1');
        /* if (tagQueue.length) {
             if (currentSearch === tagQueue.models[0].attributes.name){
                    tagQueue.shift();
                }
         }*/
        tagListView.loadFavoritedTag();
      });

      $('#search-settings .sort-checkbox').on('mouseup', function(e) {
        mouseupedEL = $(e.currentTarget.children[1]);
        if (mouseupedEL.hasClass('bootstrap-switch-on')) {
          TM.sortType = 'INTERESTINGNESS';
          TM.sortBy = TM.sortType + "_" + TM.sortOrder;
        } else {
          TM.sortType = 'RELEVANCE';
          TM.sortBy = TM.sortType;
        }

      });
      $('#search-settings .sortdir-checkbox').on('mouseup', function(e) {
        mouseupedEL = $(e.currentTarget.children[1]);
        if (mouseupedEL.hasClass('bootstrap-switch-on')) {
          TM.sortOrder = 'DESC';
        } else {
          TM.sortOrder = 'ASC';
        }
        if (TM.sortType == 'INTERESTINGNESS') {
          TM.sortBy = TM.sortType + "_" + TM.sortOrder;
        }
      });
      $('#search-settings .tagmode-checkbox').on('mouseup', function(e) {
        mouseupedEL = $(e.currentTarget.children[1]);
        if (mouseupedEL.hasClass('bootstrap-switch-on')) {
          TM.tagMode = 'any';
        } else {
          TM.tagMode = 'all';
        }
      });
      $('#search-settings .tagsOrText-checkbox').on('mouseup', function(e) {
        mouseupedEL = $(e.currentTarget.children[1]);
        if (mouseupedEL.hasClass('bootstrap-switch-on')) {
          TM.tagsOrText = 'tags';
        } else {
          TM.tagsOrText = 'text';
        }
      });

      var totalScreenHeight, numPics = TM.perPage * TM.page,
        picHeight = 80,
        totalPicHeight = numPics * picHeight;
      $("#pics").scroll(function() {
        totalScreenHeight = $(this).scrollTop() + $(this).innerHeight();
        //console.log("Pics: " + $(this).scrollTop() + " : " + $(this).innerHeight() + " : " + $(this)[0].scrollHeight);
        // console.log('Num Pics: ' + numPics);
        numPics = TM.perPage * TM.page;
        picHeight = 80;
        totalPicHeight = numPics * picHeight + 200;
        //console.log('totalScreenHeight: ' + totalScreenHeight + ' totalPicHeight: ' + totalPicHeight);
        //if($(this).scrollTop() + $(this).innerHeight() + 10 >= $(this)[0].scrollHeight) {
        if (totalScreenHeight > totalPicHeight) {
          if (!TM.bottomScrolling) {
            $('.refresher').css('opacity', 1);
            $('.search-term').css('opacity', 0.35);
            $('.search-count').css('opacity', 0.35);
            if (TM.currentSearch == "tagmatrixbg") {
              TM.currentSearch = TM.getRandomTag();
              TM.page = 1;
              picView.newSearch();
            } else {
              TM.page++;
              picView.addToSearch();
            }
          }
          TM.bottomScrolling = true;
          clearTimeout(TM.scrollingTimeout);
          TM.scrollingTimeout = setTimeout(function() {
            TM.bottomScrolling = false;
          }, 1500);
        }
      });

      $.fn.scrollTo = function(target, options, callback) {
        if (typeof options == 'function' && arguments.length == 2) {
          callback = options;
          options = target;
        }
        var settings = $.extend({
          scrollTarget: target,
          offsetTop: 50,
          duration: 500,
          easing: 'swing'
        }, options);
        return this.each(function() {
          var scrollPane = $(this);
          var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
          var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
          scrollPane.animate({
            scrollTop: scrollY
          }, parseInt(settings.duration), settings.easing, function() {
            if (typeof callback == 'function') {
              callback.call(this);
            }
          });
        });
      }
    }
    return HeaderHandlers;
  }); // End headerHandlers