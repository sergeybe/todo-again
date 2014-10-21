define([
  'marionette',
  'moment',
  'jscrollpane',
  'collections/tasks',
  'views/taskitem',
  'text!templates/search.html'
],
function(
  Marionette,
  moment,
  jscrollpane,
  TaskCollection,
  TaskItemView,
  template) {

  return Marionette.CompositeView.extend({
    template: _.template(template),
    childView: TaskItemView,
    childViewContainer: 'ul',

    ui: {
      'input': 'input[type="text"]',
      'result': '#result'
    },

    events: {
      'keyup @ui.input': 'onDebounceChanged'
    },

    templateHelpers: function() {
      return {
        self: this,
        moment: moment,
        now: function() {
          return this.self.collection;
        }
      };
    },

    childViewOptions: function() {
      return {
        type: 'search'
      };
    },

    initialize: function(options) {
      this.collection = new TaskCollection();
      this.original = options.collection;

      this.onDebounceChanged = _.debounce(function() {
        this.onChanged();
      }, 500).bind(this);
    },

    onShow: function() {
      $('#result .scroller').jScrollPane({
        autoReinitialise: true
      });
    },

    onChanged: function() {
      var text = this.ui.input.val();
      if (text) {
        console.log(text);
        var data = this.original.search(text);
        this.collection.reset(data);
        this.ui.result.show();
      } else {
        this.ui.result.hide();
      }
    }
  });

});
