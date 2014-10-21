define([
  'marionette',
  'views/tasklist',
  'views/taskadd',
  'text!templates/layout.html'
],
function(Marionette, TaskListView, TaskAddView, template) {

  return Marionette.LayoutView.extend({
    template: _.template(template),

    ui: {
      addButton: '#add-button'
    },

    regions: {
      searchBox: '#search-box',
      dialog: '#dialog',
      tasks: '#tasks'
    },

    onShow: function() {
      this.tasks.show(new TaskListView());

      this.ui.addButton.on('click', $.proxy(function() {
        if (this.dialog.currentView) {
          this.dialog.reset();
        } else {
          var collection =  this.tasks.currentView.collection;
          this.dialog.show(new TaskAddView({collection: collection}));
        }
      }, this));

    }
  });

});
