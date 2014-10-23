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

    templateHelpers: function() {
      return {
        self: this,
        id: 'task-' + this.model.cid,
        moment: moment,
        today: moment(this.model.collection.today),
        datetime: moment(this.model.get('datetime')),
        getCssClass: function() {
          if (this.complited) {
            return 'complited-task';
          }
          if (this.today.isBefore(this.datetime, 'day')) {
            return 'future-task';
          }
          if (this.today.isAfter(this.datetime, 'day')) {
            return 'overdue-task';
          }
          return 'today-task';
        }
      };
    },

    getTemplate: function() {
      if (this.options.type === 'search') {
        return _.template(template2);
      }
      return _.template(template1);
    },

    onCheckboxChanged: function() {
      console.log('checked');
      this.model.set('complited', !this.model.get('complited'));
      // this.model.save();
      this.render();
    }

  });

});
