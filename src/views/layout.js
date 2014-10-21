define([
  'marionette',
  'collections/tasks',
  'views/tasklist',
  'views/taskadd',
  'views/search',
  'text!templates/layout.html'
],
function(
  Marionette,
  TaskCollection,
  TaskListView,
  TaskAddView,
  SearchView,
  template) {

  return Marionette.LayoutView.extend({
    template: _.template(template),

    ui: {
      addButton: '#add-button'
    },

    regions: {
      searchbox: '#search-box',
      dialog: '#dialog',
      tasks: '#tasks'
    },

    onShow: function() {
      var collection = new TaskCollection();
      collection.fetch();

      var taskListView = new TaskListView({collection: collection});
      var searchView = new SearchView({collection: collection});

      this.tasks.show(taskListView);
      this.searchbox.show(searchView);

      this.ui.addButton.on('click', $.proxy(function() {
        if (this.dialog.currentView) {
          this.dialog.reset();
        } else {
          this.dialog.show(new TaskAddView({collection: collection}));
        }
      }, this));

    }
  });

});
