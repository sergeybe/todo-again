define([
  'backbone',
  'moment'
],
function(Backbone, moment) {

  return Backbone.Model.extend({
    defaults: function() {
      return {
        description: '',
        datetime: moment(),
        complited: false
      };
    },

    parse: function(resp) {
      resp.datetime = moment(resp.datetime);
      return resp;
    }
  });

});
