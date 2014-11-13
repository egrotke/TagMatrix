
(function($) {
    var currentSearch ='tagmatrixbg', 
        previousSearch,
        slideIndex = 0,
        slideshowInterval,
        numSlides = 0,
        page = 1,
        slideshowOn = false,
        bottomScrolling = false,
        apiKey = '78fc47e887da553c5b397c61822c5854',
   
        newsTagData =  [
            { category : 'News',
                terms :  [ 'Ferguson', 'PoliceBrutality','Ebola','Drought', 'Robin Williams', 'Gaza', 'Israel', 'Lauren Bacall', 'World Cup 2014', 'Sochi 2014']
            }
        ];

        curatedTagData =  [
            { category : 'News',
                terms :  [ 'Ferguson', 'PoliceBrutality','Ebola','Drought', 'Robin Williams', 'Gaza', 'Israel', 'Lauren Bacall', 'World Cup 2014', 'Sochi 2014']
            },{ category : 'Crafts',
                terms :  [ 'Woodworking', 'Sculpture','Knitting','Macrame', 'Quilt', 'Crochet', 'weaving']
            },{ category : 'Natural Wonders',
                terms : ['Chefchaouen', 'Stonehenge','Easter Island', 'Everest', 'Ha Long Bay', 'natural arches', 'Tsingy de Bemaraha', 'Mount Roraima', 'Great Barrier Reef',  'Zhangye', 'cotton castle', 'Salvation Mountain',  'hoodoos', 'tufa',  'angkor wat',  'devils tower', 'yellowstone']
            },{ category : 'Caverns',
                terms :  [ 'Cave of the Crystals', 'Swallows Cave', 'Ghost Cave', 'Carlsbad Caverns','Škocjan Caves', 'Deer Cave', 'Onondaga Cave', 'Majlis al Jinn',  'Fingal Cave',  'Glowworm Cave',  'Reed Flute Cave', 'Ice Cavern']
            },{ category : 'Canyons',
                terms :  [ 'Antelope Slot Canyon', 'Zhangjiajie','zion','bryce canyon', 'Grand Canyon' ,'monument valley','narrows']
            },{ category : 'Trees',
                terms :  ['Malagasy Baobob','giant redwood', 'Rainbow Eucalyptus', 'banyon tree','Dragon Blood Tree', 'Jabuticaba', 'Root Bridges',  'Joshua Tree','live oak tree', 'weeping willow', 'Blue Jacaranda', 'Cannonball Tree', 'Bald Cypress', 'Monkey Puzzle', 'Red Mangrove']
            },{ category : 'Clouds',
                terms :  ['cumulus', 'stratus clouds', 'cirrus', 'cirrocumulus', 'cirrostratus','Altostratus', 'Cumulonimbus']
            },{ category : 'Waterfalls',
                terms :  ['Seljalandsfoss','Iguazu', 'angel falls', 'Niagra Falls', 'Skaftafell' ]
            },{ category : 'Design',
                terms :  ['infographic', 'pallete', 'fonts', 'art design','graphic design','opArt','fractals','decay','abandoned','desolate']
            },{ category : 'Cute Overload',
                terms :  ['pugs', 'lolcats','slowloris','chimps','greyhounds']
            },{ category : 'Classic Cars',
                terms : ['EType Jaguar', 'Ford Roadster', 'Ford Thunderbird', 'Galaxie 500', 'Mercury Eight', '1929 Bentley', 'AMC AMX', 'AMC Pacer','Edsel', '1971 Plymouth Satellite', 'Datsun 240z', 'ModelT', 'Bonneville Speedweek', 'low rider', 'Lamborghini Miura', 'Pontiac GTO','Corvette stingray', 'Pontiac Firebird', 'rat fink', 'airstream', 'teardrop trailer','hot rod', 'dragster','Ford Fairlane','citroen']
            },{ category : 'Photography',
                terms :[ 'Rooftopping', 'Aerial Photography', 'Landscape Photography', 'Portrait Photography', 'Still Life Photograhy', 'Action Photography', 'Sports Photography']
            },{ category : 'Photographers',
                terms :[ 'Joel-Peter Witkin', 'william eggleston',  'vivian maier', 'Richard Avedon', 'Diane Arbus', 'Juergen Teller', 'Garry Winogrand', ' Man Ray', 'Annie Leibovitz', 'Robert Mapplethorpe']
             },{ category : 'Painting',
                terms :['Self Portrait Painting', 'Landscape Painting','Still Life Painting', 'black velvet paintings','Nude Painting', 'Impressionist Painting', 'Photorealistic Painting', 'Surrealist Painting', 'Modernist Painting']
             },{ category : 'Painters',
                terms :['Barry McGee', 'Margaret Kilgallen', 'Jean-Michel Basquiat', 'Andy Warhol', 'Chris Johanson', 'Banksy', 'Van Gogh', 'Vermeer','Rembrandt', 'Mark Ryden','Pablo Picasso', 'Monet', 'Gustav Klimt', 'Jackson Pollock', 'Da Vinci']
              },{ category : 'Sculpture',
                terms :[ 'Outdoor Sculpture', 'Nude Sculpture', 'Greek Sculpture', 'Modern Sculpture']
           /* },{ category : 'music',
                terms :[  'Bob Dylan', 'Miles Davis', 'Syd Barrett', 'Rolling Stones']                
           */},{ category : 'Food',
                terms :['Ramen', 'cassoulet', 'charcuterie', 'Molecular gastronomy', 'Truffle', 'rillette', 'Meatballs', 'Pork Belly', 'Cruller','cronut', 'Creme Brulee']
            },{ category : 'Architects',
                terms :['Frank Lloyd Wright', 'Gaudi', 'Buckminster Fuller', 'Frank Gehry ', 'Eames', 'Oscar Niemeyer', 'Jean Novel', ' IM Pei', 'Zaha Hadid', 'Eero Saarinen', 'Le Corbusier', 'Rem Koolhaas', 'Alvar Aalto', 'Louis Sullivan', 'midcentury modern']
            },{ category : 'Architecture',
                terms :['Barcelona Architecture', 'Moscow Architecture', 'Italian Architecture', 'Greek Architecture', 'Tokyo Architecture', 'Paris Architecture', 'Dubai Architecture', ' German Architecture', 'Vienna Architecture', 'Prague Architecture', 'Buenos Aires Architecture', 'Hong Kong Architecture']
            }/*,{ category : 'Pinups',
                terms :[ 'pinupgirls', 'Nude Selfie',  'Burlesque', 'American Apparel ', 'Suicide Girls', 'Cheerleader', 'Cosplay', 'Bikini', 'Bikini Cosplay', 'Panties']
            }*/

    ];

    headerHandlers();


    function getRandomTag(){
        var randomCatObj = curatedTagData[Math.floor((Math.random() * curatedTagData.length))];
        currentSearch = randomCatObj.terms[Math.floor((Math.random() * randomCatObj.terms.length))];
    }

    getRandomTag();
    previousSearch = currentSearch;

        if(window.location.hash) {
                  currentSearch = window.location.hash.replace("#", "");// Fragment exists
            } else {
                  //window.location.hash = currentSearch;
            }
    
    var pic = Backbone.Model.extend({
        defaults: {
            title: '',
            description: '',
            tagList: []
        }
    });
    var picCollection = Backbone.Collection.extend({
        model:pic,
        url: function() {
            return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=any&perpage=80&sort=INTERESTINGNESS_DESC&format=json&jsoncallback=?';
        },
       // url:  'flickrSearch.php?' +  currentSearch ,
       /*url: function() {
            return 'https://flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=' + apiKey + '&tags='+ currentSearch +  '&tagmode=any&perpage=80&sort=INTERESTINGNESS_DESC&format=json&nojsoncallback=1';
        },*/
       parse: function(response) {
            return response.items;
            //return response;
        }
    });
    

    var PicView = Backbone.View.extend({
        el: $('#pics'),
        events:{
            "click li .flip-container" : "thumbClick",
            "hover li .flip-container" : "thumbHover",
            "click .tags button" : "tagClick"
        },
        initialize: function() {
        },
        newSearch: function() {
            slideIndex = 0;
            page = 1;
            picCollectionInstance.url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=any&perpage=80&sort=INTERESTINGNESS_DESC&page=' + page + '&format=json&jsoncallback=?';
            //picCollectionInstance.url = 'http://localhost:8888/tagmatrix/flickrSearch.php?' +  currentSearch ;


            console.log(picCollectionInstance.url );
            _.bindAll(this, 'render');
            picCollectionInstance.fetch({
                success: function(response, xhr) {
                    console.log(response);
                    picView.render();
                },
                error: function(response, xhr) {
                    console.log(response);
                }
            });
            $('#intro-logo').addClass('hidden');
        },
        addToSearch: function() {
             picCollectionInstance.url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + currentSearch + '&tagmode=any&perpage=80&sort=INTERESTINGNESS_DESC&page=' + page + '&format=json&jsoncallback=?';
            _.bindAll(this, 'render');
            picCollectionInstance.fetch({
                add: true,
                success: function(response, xhr) {
                    console.log(response);
                    picView.render();
                }
            });
        },
              
        /* Load new set of pics */
        render: function() {

            var foundTag, slideshowTemplate, picsTemplate, tagsArray,  squarePic,  fullSizePic, firstFullSizePic = "", descriptionNodes;
            for (var i = slideIndex; i < picCollectionInstance.length; i++) {

                if (picCollectionInstance.models[i].get("tags")){
                    tagsArray = picCollectionInstance.models[i].get("tags").split(' ');   
                               
                    for (var j = 0; j < tagsArray.length; j++) {
                        foundTag = tags.where({name:tagsArray[j]});
                        if (foundTag.length > 0){ // Tag exists, add to count
                            foundTag[0].attributes.count++;

                        } else { // Add tag to array object
                            tags.add({"name":tagsArray[j], "count":1});
                        }
                        tagsArray[j] = '<button type="button" class="btn btn-xs btn-info">' + tagsArray[j] + "</button>"
                    }
                }

                fullSizePic = (picCollectionInstance.models[i].attributes.media.m).replace("_m.jpg", "_b.jpg");
                if (!firstFullSizePic){ firstFullSizePic = fullSizePic; }

               // $(picCollectionInstance.models[i].attributes.description).find('p').each(function() { console.log(this);});
               // console.log(descriptionNodes[2]);
                picCollectionInstance.models[i].set({
                    index:i,
                    //mediumURL: picCollectionInstance.models[i].attributes.media.m,
                    thumbURL: (picCollectionInstance.models[i].attributes.media.m).replace("_m.jpg", "_s.jpg"),
                    bigURL: (picCollectionInstance.models[i].attributes.media.m).replace("_m.jpg", "_b.jpg"),
                    firstBigURL: firstFullSizePic,
                    //caption: 
                    tagList: tagsArray
                });
            }
            picsTemplate = _.template($('#pic-thumb-template').html(), {picCollectionInstance: picCollectionInstance.models});
            this.$el.html(picsTemplate);

            slideshowTemplate = _.template($('#slideshow-template').html(), {picCollectionInstance: picCollectionInstance.models});
            $("#slideshow").html(slideshowTemplate);
            
            numSlides = $("#pics ul li").length;
            $('.search-term .title').text(currentSearch);
            this.startSlideshow();
            tagView.initialize();
            
        },
        thumbClick: function(e) { /* thumb click handler */
                e.preventDefault();
                slideIndex = e.currentTarget.childNodes[1].childNodes[1].childNodes[1].attributes[1].value;
                picView.stopSlideshow();
                $('.bg-pic').css('opacity',0);
                $('#bg-pic' + slideIndex + '.bg-pic').css('opacity',1);           
        },
        thumbHover: function(e) { /* thumb click handler */
            var screenHeight = $(window).height(),
                thisDescription = e.currentTarget.nextSibling;
                e.preventDefault();
                console.log(e.currentTarget.nextSibling);
                console.log(e.clientY + " : " + screenHeight);

                if(e.clientY > screenHeight/2){
                    $('#pics li .description').css('top', 'auto');
                    $('#pics li .description').css('bottom', 0);
                } else  {
                    $('#pics li .description').css('top', 0);
                    $('#pics li .description').css('bottom', 'auto');
                }
       
        },
        tagClick: function(e) { /* Tag click handler */
                currentSearch = e.currentTarget.innerHTML;
                e.preventDefault();
                picView.newSearch();                
        },
        startSlideshow: function() {
            var lastSlide;
            slideshowOn = true;
            if (slideshowInterval){
                clearInterval(slideshowInterval);
            }
            $('#bg-pic' + slideIndex + '.bg-pic').css('opacity',1);
            //slideIndex++;
             $('.search-count').text(" : 1/20");
            slideshowInterval =  setInterval(function(){
                lastSlide = slideIndex - 1;
                $('.bg-pic').css('opacity',0).css('-webkit-transform', 'scale(1,1)'); 
                $('#bg-pic' + slideIndex + '.bg-pic').css('opacity',1).css('-webkit-transform', 'scale(1.2,1.2)'); 

                $('.pic-info').css('opacity',0).css('-webkit-transform', 'scale(.5,.5)'); 
                $('#pic-info' + slideIndex + '.pic-info').css('opacity',1).css('-webkit-transform', 'scale(1,1)'); 
                if(slideIndex < numSlides){
                    slideIndex++;
                } else {
                    randomCatObj = curatedTagData[Math.floor((Math.random() * curatedTagData.length))];
                    currentSearch = randomCatObj.terms[Math.floor((Math.random() * randomCatObj.terms.length))];
                    curatedTagView.loadFavoritedTag();
                }    
                $('.search-count').text(" : " + slideIndex + "/" + numSlides);
            }, 8000);
            $('#slideshow-button .fa-play').css('display','none');
            $('#slideshow-button .fa-pause').css('display','block');

        },
         stopSlideshow: function() {
            slideshowOn = false;
            clearInterval(slideshowInterval);
            $('#slideshow-button .fa-pause').css('display','none');
            $('#slideshow-button .fa-play').css('display','block');
        }
    });

    var category = Backbone.Model.extend({
            defaults: {
                name: '',
                likes: 0
            }
        });
    var categoryCollection = Backbone.Collection.extend({
            model:category,
            comparator: function(item) {
          return item.get("likes");
        }
    });

    /*picCollectionInstance.fetch({ 
        data: { 
            page: 1,
            tags: currentSearch,
            tagmode:'bool',
            format:'json',
            jsoncallback:'?' },
        processData: true
    });*/

var tag = Backbone.Model.extend({
        defaults: {
            name: '',
            count: '',
            likes: 0,
            category: "none"
        }
    });

var tagCollection = Backbone.Collection.extend({
        model:tag,
        comparator: function(item) {
      return item.get("name");
    }
});



var TagView = Backbone.View.extend({
        el: $('#related-tags'),
        events:{
            "click .tag button" : "tagClick"
        },
        initialize: function() {
            this.render();
        },
        render: function(){ 
            var tagsTemplate;

            tags.sort();
            tagsTemplate = _.template($('#related-tags-template').html(), {tags: tags.models});
            this.$el.html(tagsTemplate);
        },
        tagClick: function(e) { 
                currentSearch = e.currentTarget.innerHTML;
                e.preventDefault();
                picView.newSearch();                
        }
    });

    var tags = new tagCollection();
    var tagView = new TagView();

var curatedTagView = Backbone.View.extend({
        el: $('#curated-tags'),
        events:{
             "click .tag button" : "tagClick",
             "click button.category" : "headerClick",
             "click .thumbs-down" : "thumbsDownClick",
             "click .rating" : "heartClick",
             "click .categoryRating" : "categoryHeartClick",
             "click .category-expander" : "categoryExpander"
        },
        initialize: function() {
            this.render();
        },
        render: function(){ 
            var tagsTemplate, that = this;

            $.when(curatedTags.sort()).then(function() { 
                tagsTemplate = _.template($('#curated-tags-template').html(), {curatedTags: curatedTags.models, categories: categories.models});
                that.$el.html(tagsTemplate);
            });
        },
        loadFavoritedTag: function(){
            var randomIndex;
            favoritedTags = curatedTags.where({'likes':1});
            if(favoritedTags.length){
                randomIndex = Math.floor((Math.random() * favoritedTags.length));
                //console.log(randomIndex + ":" + favoritedTags[randomIndex].get('name'));
                currentSearch = favoritedTags[randomIndex].get('name');
            }
             picView.newSearch();    
        },
        tagClick: function(e) {
                currentSearch = e.currentTarget.innerHTML;
                //console.log("Tag: " + e.currentTarget.innerHTML);
                e.preventDefault();
                picView.newSearch();                
        },
        headerClick: function(e) { /* Tag click handler */
                e.preventDefault();
                currentSearch = e.currentTarget.innerHTML;
                //console.log(e.currentTarget.innerHTML);
                picView.newSearch();                
        },
        thumbsDownClick: function(e) { /* Tag click handler */
                e.preventDefault();
                //curatedTags.where({'name':$(e.currentTarget).attr('data-name')})[0].set({'likes':-1});
                $(e.currentTarget).addClass('selected');
        },
        heartClick: function(e) { /* Tag click handler */
            var tagName, numLikes, thisItem,  clickedEL = $(e.currentTarget);
                e.preventDefault();
                tagName = clickedEL.attr('data-name');
                thisItem = curatedTags.where({'name':tagName})[0].set({'likes':1});

                if (clickedEL.hasClass('selected') ){
                    clickedEL.removeClass('selected');
                } else {
                    clickedEL.addClass('selected');
                    if (!slideshowOn){
                        currentSearch = tagName;
                        picView.newSearch();  
                    }
                }                
        },
        categoryHeartClick: function(e) { /* Tag click handler */
            var tagName, numLikes, theseItems,  clickedEL = $(e.currentTarget);
                e.preventDefault();
                categoryName = clickedEL.attr('data-name');
                //console.log(categoryName);
                theseItems = curatedTags.where({'category':categoryName});
                   //console.log(theseItems);
                //numLikes = thisItem.get('likes')
                //curatedTags.where({'name':tagName}).set({'likes':numLikes++});
                if (clickedEL.hasClass('selected') ){
                    clickedEL.removeClass('selected');
                    clickedEL.siblings().find('a span.rating').removeClass('selected');
                    $( theseItems ).each(function( index ) {
                        $(this)[0].set({'likes':0});
                    });
                } else {
                    clickedEL.addClass('selected');
                    clickedEL.siblings().find('a span.rating').addClass('selected');
                    $( theseItems ).each(function( index ) {
                        $(this)[0].set({'likes':1});
                    });
                    if (!slideshowOn){
                        curatedTagView.loadFavoritedTag();
                    }

                }
                                
        },
        categoryExpander: function(e) { /* Expander click handler */
            var clickedEL = $(e.currentTarget);
            if(clickedEL.hasClass('expanded')){
                clickedEL.parent().removeClass('expanded');
                clickedEL.parent().addClass('closed');
                clickedEL.removeClass('expanded');
                clickedEL.addClass('closed');
            } else {
                clickedEL.parent().addClass('expanded');
                clickedEL.parent().removeClass('closed');
                clickedEL.addClass('expanded');
                clickedEL.removeClass('closed');
            }
            
        }
    });

    

function headerHandlers (){

    /* Search box handler */
    $('#flickr-search').on('submit', function(e){
        previousSearch = currentSearch;
        currentSearch = $( "input:first" ).val();
        e.preventDefault();
        picView.newSearch();
    });



    /*slideshow button handler */
    $('#slideshow-button').on('click', function(e){
        clickedEL = $(this);
        if(clickedEL.hasClass('stopped')){
            picView.startSlideshow();
            clickedEL.removeClass('stopped');
        } else {
            picView.stopSlideshow();
            clickedEL.addClass('stopped');
        }
        
    });
    
    $('#slide-controls .fa-backward').on('click', function(e){
       // if (page > 0){ page--;  }
       if (currentSearch != previousSearch){
            currentSearch = previousSearch;
            picView.newSearch();
        }
    });

    $('#slide-controls .fa-forward').on('click', function(e){
       // page++;
        previousSearch = currentSearch;
        getRandomTag();
        curatedTagView.loadFavoritedTag();
    });

    $('#main-icons .headerButton').on('click', function(e){
        var clickedEL = $(this);
        if(clickedEL.hasClass('selected')){
            clickedEL.removeClass('selected');
            $('header').addClass('hidden');
        } else {
            clickedEL.addClass('selected');
            $('header').removeClass('hidden');
        }
    });  

    $('#main-icons .thumbButton').on('click', function(e){
        var clickedEL = $(this);
        if(clickedEL.hasClass('selected')){
            clickedEL.removeClass('selected');
            $('#pics').addClass('hidden');
        } else {
            clickedEL.addClass('selected');
            $('#pics').removeClass('hidden');
        }
    }); 

    $('#main-icons .tagsButton').on('click', function(e){
        var clickedEL = $(this);
        if(clickedEL.hasClass('selected')){
            clickedEL.removeClass('selected');
            $('#curated-tags').addClass('hidden');
        } else {
            clickedEL.addClass('selected');
            $('#curated-tags').removeClass('hidden');
        }
    }); 
    $('#main-icons .boltButton').on('click', function(e){
        var clickedEL = $(this);
        if(clickedEL.hasClass('selected')){
            clickedEL.removeClass('selected');
            $('#main-icons .infoButton, #main-icons .tagsButton, #main-icons .thumbButton, #main-icons .headerButton').removeClass('selected');
            $('#pics, header, #curated-tags, #slideshow .pic-info').addClass('hidden');
        } else {
            clickedEL.addClass('selected');
            $('#main-icons .infoButton, #main-icons .tagsButton, #main-icons .thumbButton, #main-icons .headerButton').addClass('selected');
             $('#pics, header, #curated-tags, #slideshow .pic-info').removeClass('hidden');
        }
    });  
    $('#main-icons .infoButton').on('click', function(e){
        var clickedEL = $(this);
        if(clickedEL.hasClass('selected')){
            clickedEL.removeClass('selected');
            $('#slideshow .pic-info').addClass('hidden');
        } else {
            clickedEL.addClass('selected');
             $('#slideshow .pic-info').removeClass('hidden');
        }
    });
    $('#intro-logo').on('click', function(e){
        var clickedEL = $(this);
        $(this).addClass('hidden');
    });  

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            if (!bottomScrolling){
                //console.log("window.innerHeight : " + window.innerHeight + " window.scrollY: " + window.scrollY + " document.body.scrollHeight: " + document.body.scrollHeight);
                //page++;
                //picView.addToSearch();
            }
            bottomScrolling = true;
            setTimeout(function () {bottomScrolling = false;}, 3000);
        }
    };
   } // End headerHandlers



    /* Initiate Views */
    var picCollectionInstance = new picCollection(),
        picView = new PicView(),
        categories = new categoryCollection(),
        curatedTags = new tagCollection(),
        favoritedTags  = new tagCollection(),
        curatedTagView = new curatedTagView(),
        termsArray, categoryArray = [];

        //picView.newSearch();

    function sortJSON(data, key, way) {
        return data.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    }
    curatedTagData = sortJSON(curatedTagData,'category','321');
    /* Create curated tag collection here (Add categories to data) */
    $( curatedTagData ).each(function( index ) {
        termsArray = $( this )[0].terms;
        categoryArray.push($(this)[0].category);
        categories.add({"name":$(this)[0].category});
        for (var x=0;x< termsArray.length; x++){
            curatedTags.add({"name":termsArray[x], "category": $( this )[0].category });
        }

    });
    curatedTagView.initialize();

})(jQuery);