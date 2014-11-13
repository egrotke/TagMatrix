define([
  'jquery',
  'underscore',
  'backbone',
  'models/picModel',
  'TM_Globals'
], function($, _, Backbone, PicModel, TM) {

  console.log('TM');
  console.log(TM);
  var PicCollection = Backbone.Collection.extend({
    model: PicModel,
    url: TM.rootURL + 'pics/?tags=' + TM.currentSearch + '&page=' + TM.page + '&perPage=' + TM.perPage + '&tagMode=' + TM.tagMode + '&sortBy=' + TM.sortBy + '&tagsOrText=' + TM.tagsOrText,
    comparator: function(item) {
      return -parseInt(item.get("views"));
    },
    parse: function(response) {
      return response;
    }
  });


  return PicCollection;
});