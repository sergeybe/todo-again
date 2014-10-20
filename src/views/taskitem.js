define([
  'marionette',
  'moment',
  'text!templates/taskitem.html'
],
function(Marionette, moment, template) {

  return Marionette.ItemView.extend({
    tagName: 'li',
    className: 'task',
    template: _.template(template),

    ui: {
      checkbox: 'input[type="checkbox"]'
    },

    triggers: {
      'change @ui.checkbox': 'checkbox:changed'
    },

    initialize: function() {
      this.today = moment.unix(this.model.collection.today);
      this.id = 'task-' + this.model.cid;
      this.datetime = moment.unix(this.model.get('datetime'));

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

    templateHelpers: function() {
      return {
        self: this,
        status: function() {
          return 42;
        },
      };
    },

    onCheckboxChanged: function(e) {
      console.log('checked');
      this.model.set('complited', !this.model.get('complited'));
      // this.model.save();
    }

  });

});
