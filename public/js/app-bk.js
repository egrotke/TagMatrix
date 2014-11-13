var
    newsTagData = [{
        category: 'News',
        terms: ['Ferguson', 'Police Brutality', 'Ebola', 'Drought', 'Robin Williams', 'Gaza', 'Israel', 'Lauren Bacall', 'World Cup 2014', 'Sochi 2014']
    }],
    curatedTagData = [{
        category: 'News',
        terms: ['Ferguson', 'PoliceBrutality', 'Ebola', 'Drought', 'Robin Williams', 'Gaza', 'Israel', 'Lauren Bacall', 'World Cup 2014', 'Sochi 2014']
    }, {
        category: 'Unique Resorts',
        terms: ['Hotel Kakslauttanen', 'Manta Resort ', 'Petrova Gora', 'Äscher Cliff', 'Poseidon Undersea Resort', 'Magic Mountain Lodge', 'Katikies Hotel']
    }, {
        category: 'Soviet Monument',
        terms: ['Podgarić ', 'Petrova Gora', 'Tjentište', 'Jasenovac', 'Kadinjača']
    }, {
        category: 'Destinations',
        terms: ['Popeye Village', 'Castello di Sammezzano', 'Lycian Tombs', 'Keukenhof Park', 'Fairy Pools', 'White Temple', 'Litlanesfoss']
    }, {
        category: 'Modern Art',
        terms: ['Outsider Art', 'Conceptual Art', 'Concept Art', 'Absurdist Art', 'Performance Art', 'Installation Art', 'Stuckism', 'Pop Art', 'Fluxus', 'Avant Garde Art']
    }, {
        category: 'Earthwork Art',
        terms: ['Earthship', 'James Turrell', 'Land Art', 'Andy Goldsworthy', 'Salvation Mountain', 'Spiral Jetty', 'Graffitti', 'Watts Towers', 'Environmental Art']
    }, {
        category: 'Crafts',
        terms: ['Woodworking', 'Sculpture', 'Knitting', 'Macrame', 'Quilt', 'Crochet', 'Weaving']
    }, {
        category: 'Festivals',
        terms: ['Human Towers', 'Tournament of Roses', 'Tomatina', 'Running of the Bulls', 'Rio Carnival', 'Boryeong Mud Festival', 'Burning Man', 'Mardi Gras', 'Harbin Ice and Snow Festival', 'Dia de los muertos', 'Holi India', 'Pingxi Lantern Festival', 'International Balloon Fiesta', 'Battle of the Oranges', 'Cascamorras', 'Cheese Rolling Festival']
    }, {
        category: 'Natural Wonders',
        terms: ['Chefchaouen', 'Stonehenge', 'Easter Island', 'Everest', 'Ha Long Bay', 'Tsingy de Bemaraha', 'Mount Roraima', 'Great Barrier Reef', 'Zhangye', 'Tsingy de Bemaraha', 'angkor wat', 'devils tower', 'yellowstone']
    }, {
        category: 'Rock Formations',
        terms: ['Basalt Columns', 'hoodoos', 'tufa', 'tafoni', 'Natural Arches', 'Cotton Castle', 'Fairy Chimneys', 'Wulingyuan', 'Litlanesfoss', 'Rainbow Mountains', 'Grotta Palazzese']
    }, {
        category: 'Caverns',
        terms: ['Cave of the Crystals', 'Swallows Cave', 'Ghost Cave', 'Carlsbad Caverns', 'Škocjan Caves', 'Deer Cave', 'Onondaga Cave', 'Majlis al Jinn', 'Fingal Cave', 'Glowworm Cave', 'Reed Flute Cave', 'Ice Cavern']
    }, {
        category: 'Canyons',
        terms: ['Antelope Slot Canyon', 'Zhangjiajie', 'Zion', 'Bryce Canyon', 'Grand Canyon Photography', 'Monument Valley', 'Zion Narrows']
    }, {
        category: 'Trees',
        terms: ['Malagasy Baobab', 'Giant Redwood', 'Rainbow Eucalyptus', 'Banyon Tree', 'Dragon Blood Tree', 'Jabuticaba', 'Root Bridges', 'Joshua Tree', 'live oak tree', 'weeping willow', 'Blue Jacaranda', 'Cannonball Tree', 'Bald Cypress', 'Monkey Puzzle']
    }, {
        category: 'Clouds',
        terms: ['Cumulus', 'Pyrocumulus', 'Stratus Clouds', 'Cirrus', 'Cirrocumulus', 'Cirrostratus', 'Altostratus', 'Cumulonimbus']
    }, {
        category: 'Waterfalls',
        terms: ['Seljalandsfoss', 'Iguazu', 'angel falls', 'Niagra Falls', 'Skaftafell', 'Litlanesfoss']
    }, {
        category: 'Design',
        terms: ['infographic', 'pallete', 'fonts', 'art design', 'graphic design', 'opArt', 'fractals', 'decay', 'abandoned', 'desolate']
    }, {
        category: 'Cute Overload',
        terms: ['Pugs', 'Lolcats', 'Slow Loris', 'Chimps', 'Monkey', 'greyhounds', 'Jellyfish', 'Lemurs', 'Poodle']
    }, {
        category: 'Classic Cars',
        terms: ['EType Jaguar', 'Ford Roadster', 'Ford Thunderbird', 'Galaxie 500', 'Mercury Eight', '1929 Bentley', 'AMC AMX', 'AMC Pacer', 'Edsel', '1971 Plymouth Satellite', 'Datsun 240z', 'ModelT', 'Bonneville Speedweek', 'low rider', 'Lamborghini Miura', 'Pontiac GTO', 'Corvette stingray', 'Pontiac Firebird', 'rat fink', 'airstream', 'teardrop trailer', 'hot rod', 'dragster', 'Ford Fairlane', 'citroen']
    }, {
        category: 'Photography',
        terms: [' Leicaflex', 'Nude photography', 'Tilt Shift', 'Macro Photography', 'Long Exposure Photography', 'Rooftopping', 'Aerial Photography', 'Landscape Photography', 'Portrait Photography', 'Still Life Photography', 'Action Photography', 'Sports Photography']
    }, {
        category: 'Photographers',
        terms: ['Joel-Peter Witkin', 'William Eggleston', 'Vivian Maier', 'Richard Avedon', 'Diane Arbus', 'Juergen Teller', 'Garry Winogrand', 'Man Ray', 'Annie Leibovitz', 'Robert Mapplethorpe']
    }, {
        category: 'Painting',
        terms: ['Self Portrait Painting', 'Landscape Painting', 'Still Life Painting', 'black velvet paintings', 'Nude Painting', 'Impressionist Painting', 'Photorealistic Painting', 'Surrealist Painting', 'Modernist Painting']
    }, {
        category: 'Modern Artists',
        terms: ['Barry McGee', 'Margaret Kilgallen', 'Jean-Michel Basquiat', 'Andy Warhol', 'Chris Johanson', 'Banksy', 'Mark Ryden', 'Jackson Pollock']
    }, {
        category: 'Classic Artists',
        terms: ['Van Gogh', 'Vermeer', 'Rembrandt', 'Pablo Picasso', 'Monet', 'Gustav Klimt', 'Da Vinci']
    }, {
        category: 'Sculpture',
        terms: ['Outdoor Sculpture', 'Nude Sculpture', 'Greek Sculpture', 'Modern Sculpture']
    }, {
        category: 'Food',
        terms: ['Ciopinno', 'Ramen', 'Cassoulet', 'charcuterie', 'Molecular Gastronomy', 'Truffle', 'rillette', 'Meatballs', 'Pork Belly', 'Cruller', 'cronut', 'Creme Brulee']
    }, {
        category: 'Architects',
        terms: ['Frank Lloyd Wright', 'Gaudi', 'Buckminster Fuller', 'Frank Gehry ', 'Eames', 'Oscar Niemeyer', 'Jean Novel', 'IM Pei', 'Zaha Hadid', 'Eero Saarinen', 'Le Corbusier', 'Koolhaas', 'Alvar Aalto', 'Louis Sullivan', 'midcentury modern']
    }, {
        category: 'Architecture',
        terms: ['Art Deco', 'Barcelona Architecture', 'Moscow Architecture', 'Italian Architecture', 'Greek Architecture', 'Tokyo Architecture', 'Paris Architecture', 'Dubai Architecture', 'German Architecture', 'Vienna Architecture', 'Prague Architecture', 'Buenos Aires Architecture', 'Hong Kong Architecture']
    }, {
        category: 'Sport',
        terms: ['Pinball', 'Rugby', 'Longboarding', 'Curling', 'Beach Volleyball', 'Mud Wrestling', 'Roller Derby', 'Demolition Derby', 'Cheerleading Competition', 'Synchronized swimming']
    }, {
        category: 'NSFW',
        terms: ['Gil Elvgren', 'Richard Kern', 'Suicide Girls', 'Blackheart Burlesque', 'American Apparel', 'Bikini Cosplay']
    }];

var TM = {
    rootURL: window.location.protocol + '//' + window.location.host + window.location.pathname.substring(0),
    currentSearch: 'tagmatrixbg',
    tagMode: 'all',
    sortBy: 'INTERESTINGNESS_DESC',
    sortType: 'INTERESTINGNESS',
    sortOrder: 'DESC',
    tagsOrText: 'tags',
    perPage: 50,
    previousSearch: '',
    slideIndex: 1,
    numSlides: 0,
    numReloads: 0,
    page: 1,
    slideshowOn: false,
    bottomScrolling: false,
    scrollingTimeout: 0,
    getRandomTag: function() {
        var randomCatObj = curatedTagData[Math.floor((Math.random() * curatedTagData.length))];
        //console.log(randomCatObj.terms[Math.floor((Math.random() * randomCatObj.terms.length))]);
        return randomCatObj.terms[Math.floor((Math.random() * randomCatObj.terms.length))];
    }
}

    function sortJSON(data, key, way) {
        return data.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            if (way === '123') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
            if (way === '321') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }


var slideshowInterval;

var Pic = Backbone.Model.extend({
    defaults: {
        title: '',
        description: '',
        tagList: [],
        tagName: '',
        likes: 0,
        views: 0
    }
});

var PicCollection = Backbone.Collection.extend({
    model: Pic,
    url: TM.rootURL + 'pics/?tags=' + TM.currentSearch + '&page=' + TM.page + '&perPage=' + TM.perPage + '&tagMode=' + TM.tagMode + '&sortBy=' + TM.sortBy + '&tagsOrText=' + TM.tagsOrText,
    comparator: function(item) {
        return -parseInt(item.get("views"));
    },
    parse: function(response) {
        return response;
    }
});


var PicView = Backbone.View.extend({
    events: {
        "click .pic-thumb .flip-container": "thumbClick",
        "hover .pic-thumb .flip-container": "thumbHover",
        "click .tags button": "tagClick",
        "click .like-icon": "likeClick"
    },
    initialize: function() {},
    newSearch: function() {
        var that = this;
        $('.refresher').css('opacity', 1);
        $('.search-term, .search-count').css('opacity', 0.35);
        slideIndex = 1;
        page = 1;
        //this.collection.url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + TM.currentSearch + '&tagmode=any&perpage=80&sort=INTERESTINGNESS_DESC&page=' + page + '&format=json&jsoncallback=?';
        this.collection.url = TM.rootURL + 'pics/?tags=' + TM.currentSearch + '&page=' + TM.page + '&perPage=' + TM.perPage + '&tagMode=' + TM.tagMode + '&sortBy=' + TM.sortBy + '&tagsOrText=' + TM.tagsOrText,

        console.log('New search');
        _.bindAll(this, 'render');
        this.collection.fetch({
            success: function(response, xhr) {
                console.log(response);
                console.log(response.url);
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
        //this.collection.url = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + TM.currentSearch + '&tagmode=any&perpage=80&sort=INTERESTINGNESS_DESC&page=' + page + '&format=json&jsoncallback=?';
        this.collection.url = TM.rootURL + 'pics/?tags=' + TM.currentSearch + '&page=' + TM.page + '&perPage=' + TM.perPage + '&tagMode=' + TM.tagMode + '&sortBy=' + TM.sortBy + '&tagsOrText=' + TM.tagsOrText,
        _.bindAll(this, 'render');
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
        this.collection.sort().each(function(pic, i) {

            if (pic.get("tags")) {
                tagsArray = pic.get("tags").split(' ');

                for (var j = 0; j < tagsArray.length; j++) {
                    foundTag = tags.where({
                        name: tagsArray[j]
                    });
                    if (foundTag.length > 0) { // Tag exists, add to count
                        foundTag[0].attributes.count++;

                    } else { // Add tag to array object
                        tags.add({
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
                if (thisModel = that.options.tagQueue.where({
                    'name': TM.currentSearch
                })[0]) {
                    if (thisModel.attributes.hasPic !== 'hasPic') {
                        thisModel.set({
                            'picURL': picFarm + "_n.jpg"
                        });
                        thisModel.set({
                            'hasPic': 'hasPic'
                        });
                        //tagQueueView.render();
                    }
                }

            }

        });

        currentNumSlides = TM.numSlides;
        picsTemplate = _.template($('#pic-thumb-template').html(), {
            pics: this.collection.models,
            numSlides: currentNumSlides,
            tagName: TM.currentSearch,
            page: TM.page,
            perPage: TM.perPage
        });
        slideshowTemplate = _.template($('#slideshow-template').html(), {
            pics: this.collection.models,
            numSlides: currentNumSlides,
            page: TM.page,
            perPage: TM.perPage
        });

        if (newSearch) {
            this.$el.html(picsTemplate);
            $("#slideshow").html(slideshowTemplate).promise().done(function() {
                $('#bg-pic' + slideIndex + '.bg-pic').css({
                    display: 'block',
                    opacity: 1
                });
                $('#slide-controls').css('opacity', 1);
            });
        } else {
            this.$el.append(picsTemplate);
            $("#slideshow").append(slideshowTemplate).promise().done(function() {
                scrollToBottom();
                $('#bg-pic' + slideIndex + '.bg-pic').css({
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
            // console.log($('#flickr-search input[name="search-input"]').val());
            $('#pics').scrollTo(0, 0);
            this.startSlideshow(TM.currentSearch);
            tagView.initialize();
            $('#load-more').css('display', 'block');
        }
        /* for (var k = 0; k < numSlides+1; k++) {
                this.$('#pic-thumb' + k + ' .thumb-link img').on('load', function() {
                     var $that = $(this);
                    setTimeout(function() {$that.addClass('loaded') }, (30 * (k - 1)));
                });
            }*/

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
        tagQueueView.addToTagQueue(TM.currentSearch);
        this.newSearch();
    },
    likeClick: function(e) {
        var tagName, tagView, thisModel, picURL, clickedEL = $(e.currentTarget);
        e.preventDefault();

        tagName = clickedEL.attr('data-name');
        picURL = clickedEL.attr('data-url');
        //console.log(tagName + " : " + picURL);

        if (clickedEL.hasClass('liked')) {
            clickedEL.removeClass('liked');
            this.collection.where({
                'tagName': tagName
            })[0].set({
                'likes': 0
            });
            if (thisModel = tagQueue.where({
                'name': tagName
            })[0]) {
                thisModel.set({
                    'picURL': ''
                });
                thisModel.set({
                    'hasPic': ''
                });
            }
        } else {
            clickedEL.addClass('liked');

            if (thisModel = this.collection.where({
                'tagName': tagName
            })[0]) {
                thisModel.set({
                    'likes': 1
                });
            }
            if (thisModel = this.options.tagQueue.where({
                'name': tagName
            })[0]) {
                thisModel.set({
                    'picURL': picURL
                });
                thisModel.set({
                    'hasPic': 'hasPic'
                });
                //$('#tag-queue.expanded a.tag span[data-name="' + tagName + '"]').parent().addClass('hasPic').css('background-image', 'url(' + picURL + ')');
                //tagQueueView.render();
            }
            if (thisModel = this.options.curatedTags.where({
                'name': tagName
            })[0]) {
                thisModel.set({
                    'picURL': picURL
                });
                thisModel.set({
                    'hasPic': 'hasPic'
                });
                //curatedTagView.render();
                console.log(thisModel);
                thisModel.saveTag();
            }
        }
    },
    startSlideshow: function(searchTerm) {
        var lastSlide, thisModel,
            numSlide, bgPic, that = this;

        TM.slideshowOn = true;
        $('#slideshow .bg-pic').css({'transition-duration': '5s','-webkit-transition-duration':'5s'});
        $('#tag-queue button').removeClass('selected');
        $('#tag-queue a.tag').removeClass('selected');
        $('#curated-tags button').removeClass('selected');
        $('#tag-queue button[data-category="' + searchTerm + '"]').addClass('selected');
        $('#tag-queue a[data-name="' + searchTerm + '"]').addClass('selected');
        $('#curated-tags button[data-category="' + searchTerm + '"]').addClass('selected');

        if (this.options.tagQueue.length) {
            this.options.tagQueue.invoke('set', {
                "selected": ''
            });
            if (thisModel = this.options.tagQueue.where({
                'name': searchTerm
            })[0]) {
                thisModel.set({
                    'selected': 'selected'
                });
            }
        }
        if (this.options.curatedTags.length) {
            this.options.curatedTags.invoke('set', {
                "selected": ''
            });
        }
        if (thisModel = this.options.curatedTags.where({
            'name': searchTerm
        })[0]) {
            thisModel.set({
                'selected': 'selected'
            });
        }

        this.changeBackground(TM.slideIndex);

        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }

        numSlide = (TM.slideIndex > 0) ? TM.slideIndex : 1;
        if (TM.numSlides > 0) {
            $('.search-count').text(numSlide + "/" + TM.numSlides);
            //$('.tags button.selected .slidecount').css('display', 'none');
            //$('.tags button.selected .slidecount').css('display', 'inline-block').text(TM.currentSearch + " : "  + numSlide + "/" + numSlides);
        }

        slideshowInterval = setInterval(function() {
            var thother = that;
            lastSlide = slideIndex - 1;
            if (TM.slideIndex < TM.numSlides) {
                TM.slideIndex++;
            } else {
                /* if (tagQueue.length && TM.currentSearch === tagQueue.models[0].attributes.name){
                        tagQueue.shift();
                    }*/
                thother.curatedTagView.loadFavoritedTag();
            }
            thother.changeBackground(TM.slideIndex);

        }, 8000);

        $('#slideshow-button .fa-play').css('display', 'none');
        $('#slideshow-button .fa-pause').css('display', 'inline');
        $('#slideshow-button').removeClass('stopped');

    },
    stopSlideshow: function() {
        TM.slideshowOn = false;

        clearInterval(slideshowInterval);
        $('#slideshow-button').addClass('stopped');
        $('#slideshow-button .fa-pause').css('display', 'none');
        $('#slideshow-button .fa-play').css('display', 'inline');
    },
    changeBackground: function(sentIndex) {
        var thisPic, nextIndex = sentIndex + 1;
        bgPic = 'url(' + $('#slideshow #bg-pic' + sentIndex).attr('data-url') + ')';
        $('#slideshow #bg-pic' + sentIndex).css('background-image', bgPic);

        bgPic = 'url(' + $('#slideshow #bg-pic' + nextIndex).attr('data-url') + ')';
        $('#slideshow #bg-pic' + nextIndex).css('background-image', bgPic);

        $('#slideshow .bg-pic').css({'opacity': 0,'-webkit-transform': 'scale(1,1)'});
        $('#slideshow #bg-pic' + sentIndex + '.bg-pic').css({'opacity': 1, '-webkit-transform': 'scale(1.2,1.2)'});

        $('#slideshow .pic-info').css('opacity', 0); //.css('-webkit-transform', 'scale(.5,.5)'); 
        $('#slideshow #pic-info' + sentIndex + '.pic-info').css('opacity', 1); //.css('-webkit-transform', 'scale(1,1)'); 
        $('.search-count').text(" : " + sentIndex + "/" + TM.numSlides);
        $('#pics .pic-thumb .flip-container').removeClass('selected');
        $('#pics .pic-thumb .flip-container[data-index="' + sentIndex + '"]').addClass('selected');
    }
});

function scrollToBottom() {
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
}



    var Tag = Backbone.Model.extend({
        initialize: function(options) {
            _.bindAll(this);
            this.tags = options.tags;
        },
        urlRoot: '../tags',
        defaults: {
            idAttribute: '_id',
            name: '',
            count: '',
            likes: 0,
            queued: 0,
            category: "none",
            selected: '',
            picURL: '',
            hasPic: ''
        },
        saveTag: function() {
            //this.id = this.attributes._id;
            //console.log('Save is new? ' + this.isNew());
            //console.log('Save id? ' + this.id);

            this.save(null, {
                success: function(model, response) {
                    //console.log('success');
                    //console.log('ID: ' + model.id);
                },
                error: function(model, response) {
                    //console.log('Error: ');
                    //console.log(response.responseText);
                }
            });

            return false;
        },
        /*createTag:function () {
           
           console.log('Create tag');
                this.tags.create(this, {
                    success: function (model, response) {
                        //model.idAttribute = model.attributes._id;
                        //console.log(model);
                        //console.log('_ID: ' + model.attributes._id);
                        //console.log('ID: ' + model.id);                        
                    },
                    error: function (model, response) {
                        //console.log('Error: ');
                        //console.log(response.responseText);
                    }});
               
                this.tags.add(this);
            
            return false;
        },*/
        deleteTag: function() {
            this.destroy({
                success: function() {
                    alert('Tag deleted successfully');
                    //window.history.back();
                }
            });
            return false;
        }
    });


    var TagCollection = Backbone.Collection.extend({
        url: '../tags',
        model: Tag,
        comparator: function(item) {
            return item.get("likes");
        }
    });

    TagListItemView = Backbone.View.extend({

        tagName: "li",

        template: _.template($('#tag-list-item-template').html()),

        initialize: function() {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function(eventName) {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        close: function() {
            $(this.el).unbind();
            $(this.el).remove();
        }
    });

    var TagView = Backbone.View.extend({
        el: $('#related-tags'),
        events: {
            "click .tag button": "tagClick"
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            var tagsTemplate;

            tags.sort();
            tagsTemplate = _.template($('#related-tags-template').html(), {
                tags: tags.models
            });
            this.$el.html(tagsTemplate);
        },
        tagClick: function(e) {
            TM.currentSearch = e.currentTarget.innerHTML;
            e.preventDefault();
            picView.newSearch();
        }
    });

    var tags = new TagCollection();
    var tagView = new TagView();


    var TagListView = Backbone.View.extend({

        tagName: 'ul',

        initialize: function() {
            this.model.bind("reset", this.render, this);
            var self = this;
            this.model.bind("add", function(wine) {
                $(self.el).append(new TagListItemView({
                    model: tag
                }).render().el);
            });
        },

        render: function(eventName) {
            _.each(this.model.models, function(wine) {
                $(this.el).append(new TagListItemView({
                    model: tag
                }).render().el);
            }, this);
            return this;
        }
    });

    var CuratedTagView = Backbone.View.extend({
        events: {
            "click .tag button": "tagClick",
            "click .tag.hasPic": "picClick",
            "click button.category": "headerClick",
            "click .rating": "addToQueue",
            "click .categoryRating": "addFullCategoryToQueue",
            "click .category-expander": "categoryExpander"
        },
        initialize: function() {
            var that = this,
                numTags = 0;

            this.collection.fetch({
                success: function(response, xhr) {
                    console.log(response);
                    console.log('Success Fetching Tags: ' + response.length);

                    numTags = response.length;
                    if (numTags === 0) {
                        console.log('Got none, reseting....');
                        that.resetTagMatrix();
                    } else {
                        that.addCategories();
                    }
                },
                error: function(response, xhr) {
                    console.log('Error Fetching Tags: ' + response.url);
                    console.log(response);
                }
            });


            this.collection.bind("change", this.render, this);
        },
        addCategories: function() {
            var thisCat, categoryView, that = this;
            this.collection.each(function(tag, i) {

                var thisCat = tag.attributes.category,
                    thisCatModel;
                thisCatModel = new Category({
                    'name': thisCat
                });
                if (that.options.categories.where({
                    'name': thisCat
                }).length < 1) {
                    that.options.categories.add(thisCatModel);
                }
            });
            console.log(that.options.categories);
            this.render();
        },
        render: function() {
            var tagsTemplate, that = this;

            tagsTemplate = _.template($('#curated-tags-template').html(), {
                curatedTags: this.collection.models,
                categories: this.options.categories.models
            });
            that.$el.html(tagsTemplate);
        },
        loadFavoritedTag: function() {
            var thisIndex = 0,
                lastSearch,
                currentSearchModel;
            if (this.options.tagQueue.length && TM.currentSearch === this.options.tagQueue.models[0].attributes.name) {
                lastSearch = this.options.tagQueue.at(0).attributes.name;
                this.options.tagQueue.shift();
            }
            if (this.options.tagQueue.length > 1) {
                TM.currentSearch = this.options.tagQueue.at(0).attributes.name;
            } else {
                TM.currentSearch = TM.getRandomTag();
                this.options.tagQueueView.addToTagQueue(TM.currentSearch);
            }
            this.options.picView.newSearch();

        },
        resetTagMatrix: function() {
            var that = this;


            curatedTagData = sortJSON(curatedTagData, 'category', '321');
            /* Create curated tag collection here (Add categories to data) */
            console.log('curatedTagData: ');
            console.log(curatedTagData);
            $(curatedTagData).each(function(index) {
                termsArray = $(this)[0].terms;

                that.options.categories.add({
                    "name": $(this)[0].category
                });
                for (var x = 0; x < termsArray.length; x++) {
                    tag = new Tag({
                        "name": termsArray[x],
                        "category": $(this)[0].category
                    });
                    that.collection.add(tag);
                }
            });
            this.addCategories();
        },
        tagClick: function(e) {
            TM.currentSearch = e.currentTarget.innerHTML;
            this.options.tagQueueView.addToTagQueue(TM.currentSearch);
            e.preventDefault();
            this.options.picView.newSearch();
        },
        picClick: function(e) {
            var clickedEL = $(e.currentTarget);
            e.preventDefault();
            this.options.tagQueueView.addToTagQueue(TM.currentSearch);
            TM.currentSearch = clickedEL.attr('data-name');
            this.options.picView.newSearch();
        },
        headerClick: function(e) { /* Tag click handler */
            e.preventDefault();
            TM.currentSearch = e.currentTarget.innerHTML;
            this.options.tagQueueView.addToTagQueue(TM.currentSearch);
            this.options.picView.newSearch();
        },
        addToQueue: function(e) { /* Tag click handler */
            var tagName, numLikes, thisItem, clickedEL = $(e.currentTarget);
            e.preventDefault();
            tagName = clickedEL.attr('data-name');


            if (clickedEL.hasClass('selected')) {
                thisItem = curatedTags.where({
                    'name': tagName
                })[0].set({
                    'queued': 0
                });
                tagQueue.remove(tagQueue.find(function(model) {
                    return model.get('name') == thisItem.attributes.name;
                }));

                clickedEL.removeClass('selected');
                clickedEL.children('i.fa').removeClass('fa-minus-circle');
                clickedEL.children('i.fa').addClass('fa-plus-circle');
            } else {
                thisItem = this.collection.where({
                    'name': tagName
                })[0].set({
                    'queued': 1
                });
                this.options.tagQueueView.addToTagQueue(thisItem.attributes.name, tagName);
                console.log(thisItem.attributes.name + " : " + tagName);

                clickedEL.addClass('selected');
                clickedEL.children('i.fa').addClass('fa-minus-circle');
                clickedEL.children('i.fa').removeClass('fa-plus-circle');
                if (!TM.slideshowOn) {
                    TM.currentSearch = tagName;
                    this.options.picView.newSearch();
                }

            }
        },
        addFullCategoryToQueue: function(e) { /* Tag click handler */
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
                    that.options.tagQueueView.addToTagQueue(tag.attributes.name, categoryName);
                });
                if (!TM.slideshowOn) {
                    this.loadFavoritedTag();
                }
            }

        },
        categoryExpander: function(e) { /* Expander click handler */
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


        }
    });

    var TagQueueView = Backbone.View.extend({
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

            if (this.options.curatedTags.length > 0) {
                this.collection.add(this.options.curatedTags.where({
                    'queued': 1
                }));
            }
            this.collection.reset(this.collection.shuffle(), {
                silent: true
            });
            this.collection.bind("change", this.render, this);
        },
        render: function() {
            var tagQueueTemplate, that = this;

            tagQueueTemplate = _.template($('#tag-queue-template').html(), {
                tagQueue: this.collection.models
            });
            that.$el.html(tagQueueTemplate);
        },
        addToTagQueue: function(tagName, categorySent) {
            var tagExists, existingTag;

            categorySent = (categorySent) ? categorySent : 'related';
            tagExists = this.collection.where({
                'name': tagName
            })[0];
            existingTag = this.options.curatedTags.where({
                'name': tagName
            });

            if (!tagExists) {
                if (existingTag.length > 0) {
                    console.log('Add existingTag: ' + existingTag.name);
                    this.collection.add(existingTag, {
                        at: 0
                    });
                } else {
                    console.log(' Create newTag: ' + tagName);
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
            curatedTagModel = this.options.curatedTags.where({
                'name': tagName
            })[0];
            thisTagModel = this.collection.where({
                'name': tagName
            })[0];

            if (clickedEL.hasClass('liked')) {
                console.log('unlike');
                clickedEL.removeClass('liked');
                curatedTagModel.set({
                    'likes': 0
                });
                thisTagModel.set({
                    'likes': 0
                });
            } else {
                console.log('like');
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
            var  numqueued, clickedEL = $(e.currentTarget);
            tagName = clickedEL.attr('data-name'),
            dataIndex = clickedEL.attr('data-index'),
            thisItem = this.options.curatedTags.where({
                'name': tagName
            })[0];
            console.log(this.options);
            e.preventDefault();

            this.collection.remove(this.options.tagQueue.find(function(model) {
                return model.get('name') == tagName;
            }));

            if (tagName === TM.currentSearch) {
                this.options.curatedTagView.loadFavoritedTag();
            }

            // Update Curated Tags
            $(thisItem).set({
                'queued': 0
            });
            curatedTagEL = $('#curated-tags .rating[data-name="' + tagName + '"]')
            console.log(curatedTagEL);
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
                this.options.picView.startSlideshow(TM.currentSearch);
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

    var Category = Backbone.Model.extend({
        url: '../categories',
        defaults: {
            name: '',
            queued: 0,
            expanded: 'closed'
        }
    });
    var CategoryModelView = Backbone.View.extend({
        initialize: function() {
            this.model.bind("change", this.render, this);
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
    var CategoryCollection = Backbone.Collection.extend({
        model: Category,
        comparator: function(item) {
            return item.get("queued");
        }
    });


    Backbone.Model.prototype.idAttribute = "_id";

    /* Initiate Views */
    var pics = new PicCollection(),
      categories = new CategoryCollection(),
      curatedTags = new TagCollection(),
      popularTags = new TagCollection(),
      tagQueue = new TagCollection(),
      tagQueueView,
      curatedTagView,
      termsArray,
      picView = new PicView({
        collection: pics,
        el: $('#pics'),
        tagQueue: tagQueue,
        curatedTags: curatedTags,
        curatedTagView: curatedTagView
      }),
      tagQueueView = new TagQueueView({
        el: $('#tag-queue'),
        collection: tagQueue,
        curatedTags: curatedTags,
        picView: picView,
        tagQueue: tagQueue,
        curatedTagView: curatedTagView
      }),
      curatedTagView = new CuratedTagView({
        el: $('#curated-tags'),
        collection: curatedTags,
        categories: categories,
        tagQueueView: tagQueueView,
        picView: picView,
        tagQueue: tagQueue
      });


    headerHandlers(tagQueueView, picView);

    var tagRouter = Backbone.Router.extend({
      routes: {
        "tags": "list",
        "tags/add": "addTag",
        "tag/:id": "viewTag",
        "tag/:id/edit": "editTag"
        // ... other routes
      },
      list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var tagList = new TagCollection();
        tagList.fetch({
          success: function() {
            $("#content").html(new TagListView({
              model: tagList,
              page: p
            }).el);
          }
        });
      },
      addTag: function() {
        var tag = new Tag();
      },
      viewTag: function(id) {
        this.navigate("tag/" + id + '/edit'); // updates the fragment for us, but doesn't trigger the route
      },
      editTag: function(id) {
        console.log("Edit todo opened.");
      }
    });

    var myTagRouter = new tagRouter();
    Backbone.history.start();
  };