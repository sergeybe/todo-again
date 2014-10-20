require.config({
  baseUrl: './src/',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    underscore: '../bower_components/lodash/dist/lodash',
//    underscore: '../bower_components/underscore/underscore',
    domReady: '../bower_components/requirejs-domready/domReady',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    text: '../bower_components/requirejs-text/text',
    moment: '../bower_components/moment/moment'
///    momentRu: '../bower_components/moment/locale/ru'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    },
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    },
    moment: {
//      deps: ['momentRu']
    }
  },
  config: {
    moment: {
      noGlobal: true
    }
  }
});

requirejs([
  'domReady',
  'app'
], function(domReady, App) {

  domReady(function() {
    var app = new App({container: '#app'});
    app.start();
    window.app = app;
  });

});
