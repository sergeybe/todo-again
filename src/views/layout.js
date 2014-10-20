define([
  'marionette',
  'views/tasklist',
  'text!templates/layout.html'
],
function(Marrionette, TaskList, template) {

  return Backbone.Marionette.LayoutView.extend({
    template: _.template(template),

    regions: {
      searchBox: '#search-box',
      tasks: '#tasks'
    },

    onShow: function() {
      this.tasks.show(new TaskList());
    }
  });

});
