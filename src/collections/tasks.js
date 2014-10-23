define([
  'backbone',
  'moment',
  'models/task'
],
function(Backbone, moment, TaskModel) {

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
    },

    stats: function() {
      var complitedTasks = 0;
      var todayTasks = 0;
      var futureTasks = 0;
      var overdueTasks = 0;

      this.each(function(task) {
        if (task.get('complited')) {
          complitedTasks++;
        } else {
          var datetime = moment(task.get('datetime'));
          var today = moment(this.today);

          if (today.isBefore(datetime, 'day')) {
            futureTasks++;
          } else if (today.isAfter(datetime, 'day')) {
            overdueTasks++;
          } else {
            todayTasks++;
          }
        }
      });

      return {
        complitedTasks: complitedTasks,
        overdueTasks: overdueTasks,
        todayTasks: todayTasks,
        futureTasks: futureTasks
      };
    }
  });

});
