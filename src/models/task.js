define([
  'backbone',
],
function(Backbone) {

  return Backbone.Model.extend({
    defaults: function() {
      return {
        description: '',
        datetime: new Date().getTime(),
        complited: false
      };
    }
  });

});
