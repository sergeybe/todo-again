define([
  'backbone',
  'models/task'
],
function(Backbone, TaskModel) {

  return Backbone.Collection.extend({
    model: TaskModel,
    url: '/static/data1.json',
    today: 0,

    parse: function(data) {
      this.today = data.today;
      return data.tasks;
    },

    search: function(str) {
      var tasks = [];
      if (str) {
        var pattern = new RegExp(str, 'i');

        this.each(function(task) {
          var description = task.get('description');
          if (pattern.test(description)) {
            tasks.push(task);
          }
        });
      }
      return tasks;
    }
  });

});
