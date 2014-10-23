define([
  'marionette',
  'moment',
  'text!templates/taskitem.html',
  'text!templates/tasksearchitem.html'
],
function(Marionette, moment, template1, template2) {

  return Marionette.ItemView.extend({
    tagName: 'li',
    className: 'task',

    ui: {
      checkbox: 'input[type="checkbox"]'
    },

    triggers: {
      'change @ui.checkbox': 'checkbox:changed'
    },

    initialize: function() {
      this.today = moment(this.model.collection.today);
      this.id = 'task-' + this.model.cid;
      this.datetime = moment(this.model.get('datetime'));
    },

    templateHelpers: function() {
      return {
        self: this,
        moment: moment,
        status: function() {
          return 42;
        },
      };
    },

    getTemplate: function() {
      if (this.options.type === 'search') {
        return _.template(template2);
      }
      return _.template(template1);
    },

    onBeforeRender: function() {
      console.log("ItemView::onRender");
      if (this.model.get('complited')) {
        this.datetimeClass = 'complited-task';
      } else if (this.today.isBefore(this.datetime, 'day')) {
        this.datetimeClass = 'future-task';
      } else if (this.today.isAfter(this.datetime, 'day')) {
        this.datetimeClass = 'overdue-task';
      } else {
        this.datetimeClass = 'today-task';
      }
    },

    onCheckboxChanged: function() {
      console.log('checked');
      this.model.set('complited', !this.model.get('complited'));
      // this.model.save();
      this.render();
    }

  });

});
