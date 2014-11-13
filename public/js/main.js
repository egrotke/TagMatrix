require.config({
    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min'
    },

    'shim': {
        'jquery': {
            'exports': '$'
        },

        'underscore': {
            'exports': '_'
        },

        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },

        "bootstrap": {
            deps: ["jquery"],
            exports: "$.fn.popover"
        },

        "bootstrap-switch": {
            deps: ["jquery"],
            exports: "$.fn.popover"
        }
    }

});


require([
    'app',
], function(App) {
    App.initialize();
});