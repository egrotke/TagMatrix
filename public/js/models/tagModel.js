define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var TagModel = Backbone.Model.extend({
        initialize: function(options) {
            _.bindAll(this);
            this.tags = options.tags;
        },
     /*   urlRoot: '../tags',*/
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

            this.save(null, {
                success: function(model, response) {
                    //console.log('success');
                    console.log('ID: ' + model.id);
                },
                error: function(model, response) {
                    //console.log('Error: ');
                    console.log(response.responseText);
                }
            });

            return false;
        }
    });

    return TagModel;

});