define([
  'marionette',
  'moment',
  'collections/tasks',
  'views/taskitem',
  'text!templates/tasks.html'
],
function(Marionette, moment, TaskCollection, TaskItemView, template) {

  return Marionette.CompositeView.extend({
    template: _.template(template),
    childView: TaskItemView,
    childViewContainer: 'ul',

    ui: {
      now: '#now > span'
    },

    templateHelpers: function() {
      return {
        self: this,
        now: function() {
          return this.self.collection;
        }
      };
    },

    collectionEvents: {
      'sync': 'onCollectionSync'
    },

    initialize: function() {
      this.collection = new TaskCollection();
      this.collection.fetch();
    },

    onCollectionSync: function() {
      var today = moment.unix(this.collection.today);
      this.ui.now.html(today.format('D.MM.YYYY H:mm'));
    }
  });

});
