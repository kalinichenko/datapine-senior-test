require.config({
  baseUrl: 'scripts/',
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    highcharts: {
      exports: 'Highcharts'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
    text: '../bower_components/requirejs-text/text',
    highcharts: '../bower_components/highcharts-release/highcharts.src'
  }
});

mocha.setup({
  ui: 'bdd'
});

define(function(require) {
  'use strict';
  require([
    '../spec/menu_view.spec'
  ], function() {
    if (typeof mochaPhantomJS !== "undefined") {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });
});
