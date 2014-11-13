
(function($) {
    var startTags = ['pugs','greyhounds','kittens','slowloris','chimps','ducklings','corgi','chihuahua'],
        currentSearch = startTags[Math.floor((Math.random() * startTags.length))],
        allTagsObj = [],
        slideIndex = 0,
        slideshowInterval,
        numSlides = 0,
        page = 1;

        if(window.location.hash) {
                  currentSearch = window.location.hash.replace("#", "");// Fragment exists
            } else {
                  //window.location.hash = currentSearch;
            }
    
    var pic = Backbone.Model.extend({
        defaults: {
            title: '',
            description: ''
        }
    });
    var picCollection = Backbone.Collection.extend({
        model:pic,
        url: 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=bool&sort=interestingness-desc&format=json&jsoncallback=?',
        //url: 'http://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key='.$api_key.'&user_id='.$user_id.'&tag_mode=any&tags=-blog&extras=url_o,url_t&format=json'
        parse: function(response) {
            console.log(response);
            return response.items;
        }
    });

    

    var PicView = Backbone.View.extend({
        el: $('#pics'),
        initialize: function() {
            allTagsObj = [];
            slideIndex = 0;
            
            _.bindAll(this, 'render');
            picCollectionInstance.fetch({
                success: function(response, xhr) {
                    picView.render();
                }
            });
        },
        /* Load new set of pics */
        render: function() {

            var tagsArray, tagsHTML, squarePic, picLink, picTitle, picDescription, fullSizePic, firstFullSizePic = "", cbSlideSelector;
             $('.search-term').text(currentSearch);
            $(this.el).empty().prepend("<ul></ul>");
            for (var i = 0; i < picCollectionInstance.length; i++) {
                tagsArray = picCollectionInstance.models[i].get("tags").split(' ');                

                tagsHTML = "";
                for (var j = 0; j < tagsArray.length; j++) {
                    if (allTagsObj.filter(function (obj) {return obj.name === tagsArray[j]})[0]){
                        // Tag exists, add to count
                        allTagsObj[j].count++;
                    } else { // Add tag to array
                        allTagsObj.push({"name":tagsArray[j], "count":1});
                    }
                }

                squarePic = (picCollectionInstance.models[i].attributes.media.m).replace("_m.jpg", "_s.jpg");
                picLink = picCollectionInstance.models[i].attributes.link;
                fullSizePic = (picCollectionInstance.models[i].attributes.media.m).replace("_m.jpg", "_b.jpg");

                if (!firstFullSizePic){
                    firstFullSizePic = fullSizePic;
                }
                picTitle = picCollectionInstance.models[i].attributes.title;
                picDescription = $(picCollectionInstance.models[i].attributes.description).first().text();

                picCollectionInstance.models[i].set({
                    title: picCollectionInstance.models[i].attributes.title,
                    description: picCollectionInstance.models[i].attributes.description,
                    picLink: picCollectionInstance.models[i].attributes.link,
                    thumbURL: (picCollectionInstance.models[i].attributes.media.m).replace("_m.jpg", "_s.jpg"),
                    bigURL: (picCollectionInstance.models[i].attributes.media.m).replace("_m.jpg", "_b.jpg")
                });


                $('ul', this.el).append("<li><a class='thumb-link' data-index='" + i + "' href='" + fullSizePic + "''><img src = '"   + squarePic + "'></a><div class='description'><h4>" + picTitle  + "</h4><p>" + picDescription + "</p></div>"  + "</li>");
            }


var template = _.template($('#pic-thumb-template').html(), {picCollectionInstance: picCollectionInstance.models});
$("#template-test").html(template);

            /* Add Tags */
            allTagsObj.sort(function(obj1, obj2) {
                    // Descending: first count more than the previous
                    return obj2.count - obj1.count;
                });

            for (var k = 0; k < allTagsObj.length; k++) {
                if (allTagsObj[k].count > 1){
                    tagsHTML += '<a class = "tag" href="#"><span class="minus-tag" data-name="' + allTagsObj[k].name + '">-</span><button type="button" class="btn btn-xs btn-info">' + allTagsObj[k].name +  "</button><span class='counter'>" +  allTagsObj[k].count + "</span></a> ";
                } else {
                    tagsHTML += '<a class = "tag" href="#"><span class="minus-tag" data-name="' + allTagsObj[k].name + '">-</span><button type="button" class="btn btn-xs btn-info">' + allTagsObj[k].name +  "</button></a> ";
                }
            }
            $('#tags').empty().prepend(tagsHTML);

            /* add list of bg pics */
            var bgSelector;
            $('#bg-pics').empty();
            $("#pics ul li").each(function (index) {

                bgSelector = '#bg-pic' + index;
                $('#bg-pics').append('<div id="bg-pic' + index + '" class="bg-pic"></div>')
                $(bgSelector).css('background-image', 'url(' + (picCollectionInstance.models[index].attributes.media.m).replace("_m.jpg", "_b.jpg") + ')');
            });

            numSlides = $("#pics ul li").length;
           
            picView.addHandlers();
        },
        addHandlers: function() {
            /* Minus clickClick Handler */
            $('.tag .minus-tag').on('click', function(e){
                currentSearch = currentSearch + ", -" + e.currentTarget.attributes[1].value;
                e.preventDefault();
                picCollectionInstance.url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=bool&page=' + page + '&format=json&jsoncallback=?';
                console.log(picCollectionInstance.url);
                picView.initialize(picCollectionInstance.url);
            });

            /* Tag click handler */
            $('.tag button').on('click', function(e){
                currentSearch = $(this).text();
                e.preventDefault();
                picCollectionInstance.url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=any&page=' + page + '&format=json&jsoncallback=?';
                picView.initialize();                
            });

            /* thumb click handler */
            $('.thumb-link').on('click', function(e){
                e.preventDefault();
                slideIndex = e.currentTarget.attributes[1].value;
                $('.bg-pic').css('opacity',0);
                 $('#bg-pic' + slideIndex + '.bg-pic').css('opacity',1);
            });
            picView.startSlideshow();
        },
        startSlideshow: function() {
            var lastSlide;
            if (slideshowInterval){
                clearInterval(slideshowInterval);
            }
            $('#bg-pic' + slideIndex + '.bg-pic').css('opacity',1);
            slideIndex++;
            slideshowInterval =  setInterval(function(){
                lastSlide = slideIndex - 1;
                $('.bg-pic').css('opacity',0).css('-webkit-transform', 'scale(1,1)'); 

                $('#bg-pic' + slideIndex + '.bg-pic').css('opacity',1).css('-webkit-transform', 'scale(1.05,1.05)'); 

                
                if(slideIndex < numSlides){
                    slideIndex++;
                } else {
                    slideIndex = 0;
                }
                
                
            }, 5000);
        },
         stopSlideshow: function() {
                clearInterval(slideshowInterval);
        }
    });

    /* Initiate Views */
    var picCollectionInstance = new picCollection();
    var picView = new PicView();



    /*picCollectionInstance.fetch({ 
        data: { 
            page: 1,
            tags: currentSearch,
            tagmode:'bool',
            format:'json',
            jsoncallback:'?' },
        processData: true
    });*/

    /* Search box handler */
    $('#flickr-search').on('submit', function(e){
        allTagsObj = [];
        currentSearch = $( "input:first" ).val();
        e.preventDefault();
        picCollectionInstance.url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=any&page=' + page + '&format=json&jsoncallback=?';
        picView.initialize();
    });


    /*slideshow button handlers */
    $('#slide-controls .fa-pause').on('click', function(e){
        picView.stopSlideshow();
        $('#slideshow-button .fa-pause').css('display','none');
        $('#slideshow-button .fa-play').css('display','block');
    });
    $('#slide-controls .fa-play').on('click', function(e){
        picView.startSlideshow();
        $('#slideshow-button .fa-play').css('display','none');
        $('#slideshow-button .fa-pause').css('display','block');
    });
    $('#slide-controls .fa-backward').on('click', function(e){
        if (page > 0){
            page--;
        }

        picCollectionInstance.url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=any&page=' + page + '&format=json&jsoncallback=?';
        picView.initialize();
    });
     $('#slide-controls .fa-forward').on('click', function(e){
        page++;

        picCollectionInstance.url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=any&page=' + page + '&format=json&jsoncallback=?';
        picView.initialize();
    });
    

})(jQuery);