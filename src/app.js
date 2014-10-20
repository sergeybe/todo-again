define([
  'marionette',
  'views/layout',
  'views/tasklist'
],
function(Marionette, Layout) {

  return Marionette.Application.extend({
    initialize: function(options) {
      this.addRegions({
        layout: options.container
      });

      this.layout.show(new Layout());
    }
  });

});
