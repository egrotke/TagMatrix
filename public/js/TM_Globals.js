define([
], function() {
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
        scrollingTimeout: 0
    }

    return TM;
});