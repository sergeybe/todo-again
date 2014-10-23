define([
  'marionette',
  'collections/tasks',
  'views/tasklist',
  'views/taskadd',
  'views/search',
  'views/diagram',
  'text!templates/layout.html'
],
function(
  Marionette,
  TaskCollection,
  TaskListView,
  TaskAddView,
  SearchView,
  DiagramView,
  template) {

  return Marionette.LayoutView.extend({
    template: _.template(template),

    ui: {
      addButton: '#add-button'
    },

    regions: {
      searchbox: '#search-box',
      dialog: '#dialog',
      tasks: '#tasks',
      diagram: '#diagram'
    },

    onShow: function() {
      var collection = new TaskCollection();
      collection.fetch();

      var taskListView = new TaskListView({collection: collection});
      var searchView = new SearchView({collection: collection});
      var diagramView = new DiagramView({collection: collection});

      this.tasks.show(taskListView);
      this.searchbox.show(searchView);
      this.diagram.show(diagramView);

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
