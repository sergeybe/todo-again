define([
  'marionette',
  'text!templates/diagram.html'
],
function(Marionette, template) {

  return Marionette.ItemView.extend({
    template: _.template(template),
    radius: 110,

    colors: {
      complited: '#8cc640',
      overdue: '#ff5c9d',
      today: '#00aeef',
      future: '#aaaaaa'
    },

    ui: {
      arcs: '#arcs',
      complitedInfo: '#complited-info',
      overdueInfo: '#overdue-info',
      todayInfo: '#today-info',
      futureInfo: '#future-info'
    },

    collectionEvents: {
      change: 'onCollactionChanged',
      sync: 'onCollactionChanged',
    },

    onCollactionChanged: function() {
      this.ui.arcs.empty();

      var stats = this.collection.stats();
      var len = this.collection.length;
      var PI2 = 2 * Math.PI;

      var complitedTasks = PI2 * stats.complitedTasks / len;
      var overdueTasks = complitedTasks + PI2 * stats.overdueTasks / len;
      var todayTasks =  overdueTasks + PI2 * stats.todayTasks  / len;
//      var futureTasks = todayTasks + PI2 * stats.futureTasks / len;

      this.drawPie(0, complitedTasks, this.colors.complited);
      this.drawPie(complitedTasks, overdueTasks, this.colors.overdue);
      this.drawPie(overdueTasks, todayTasks, this.colors.today);
//      this.drawPie(todayTasks, Math.PI2, this.colors.future);

      var tmp = 100.0 / this.collection.length;
      this.ui.complitedInfo.html(Math.round(tmp * stats.complitedTasks) + '%');
      this.ui.overdueInfo.html(Math.round(tmp * stats.overdueTasks) + '%');
      this.ui.todayInfo.html(Math.round(tmp * stats.todayTasks) + '%');
      this.ui.futureInfo.html(Math.round(tmp * stats.futureTasks) + '%');
    },

    drawPie: function(from, to, color) {
      var x1 = this.radius + Math.round(this.radius * Math.sin(from));
      var y1 = this.radius - Math.round(this.radius * Math.cos(from));

      var x2 = this.radius + Math.round(this.radius * Math.sin(to));
      var y2 = this.radius - Math.round(this.radius * Math.cos(to));

      var tmp = 'M' + this.radius + ',' + this.radius +
        ' L' + x1 + ',' + y1 +
        ' A' + this.radius  + ',' + this.radius +
        ' 0 ' + (to - from > Math.PI ? '1,1 ' : '0,1 ') +
        x2 + ',' + y2 + ' z';

      this.ui.arcs.append(
        $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
        .attr({d: tmp, fill: color})
      );
    }
  });

});
