define([
  'marionette',
  'moment',
  'models/task',
  'text!templates/taskadd.html'
],
function(Marionette, moment, TaskModel, template) {

  return Marionette.ItemView.extend({
    template: _.template(template),

    events: {
      'click button[type="submit"], input[type="submit"]': 'submit'
    },

    templateHelpers: function() {
      return {
        self: this,
        moment: moment
      };
    },

    initialize: function() {
      this.model = new TaskModel();
    },

    submit: function() {
      var data = this.serializeFormData();
      data.datetime = moment(data.datetime, 'D.MM.YYYY H:mm')
        .toDate()
        .getTime();

      this.triggerMethod('submit', data);
    },

    serializeFormData: function() {
      var items = this.$('input[name],textarea[name]').serializeArray();
      var data = {};
      _.each(items, function(item) {
        data[item.name] = item.value;
      });
      return data;
    },

    onSubmit: function(data) {
      this.collection.add(data);
      this.destroy();
    }
  });

});
