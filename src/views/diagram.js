define([
  'marionette',
  'text!templates/diagram.html'
],
function(Marionette, template) {

  return Marionette.ItemView.extend({
    template: _.template(template),
    radius: 110,

    ui: {
      arcs: '#arcs'
    },

    collectionEvents: {
      change: 'onCollactionChanged',
      sync: 'onCollactionChanged'
    },

    onCollactionChanged: function() {
      this.ui.arcs.empty();

      var stats = this.collection.stats();
      console.log(stats);
      var len = this.collection.length;

      var complitedTasks = 2 * Math.PI * stats.complitedTasks / len;
      var todayTasks =  complitedTasks + 2 * Math.PI * stats.todayTasks  / len;
      var futureTasks = todayTasks + 2 * Math.PI * stats.futureTasks / len;
//      var overdueTasks = futureTasks + 2 * Math.PI * stats.overdueTasks / len;

      this.drawPie(0, complitedTasks, '#8cc640');
      this.drawPie(complitedTasks, todayTasks, '#00aeef');
      this.drawPie(todayTasks, futureTasks, '#ff5c9d');
//       this.drawPie(futureTasks, overdueTasks, '');
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
      console.log(tmp);

      this.ui.arcs.append(
        $(document.createElementNS('http://www.w3.org/2000/svg', 'path'))
        .attr({d: tmp, fill: color})
      );
    }
  });

});
