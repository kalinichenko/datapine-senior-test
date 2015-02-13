/*global require*/
'use strict';

require.config({
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

require([
    'backbone',
    'app',

    // pluggable apps
    'apps/main_menu/menu_app',
    'apps/about/about_app',
    'apps/charts/charts_app'
], function (Backbone, App) {

    App.addInitializer(function(options){
      Backbone.history.start();
      App.commands.execute('main-menu:show');
    });

    App.start();
});
