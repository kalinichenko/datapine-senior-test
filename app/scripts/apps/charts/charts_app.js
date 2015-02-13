define(['app',
  'marionette'
], function(App, Marionette) {
  'use strict';

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      'charts': 'list',
      'charts/:id': 'view',
      '': 'list'
    }
  });

  var API = {
    list: function() {
      require(['apps/charts/charts_controller'], function(Controller) {
        Controller.list();
      });
    },
    view: function(id) {
      require(['apps/charts/charts_controller'], function(Controller) {
        Controller.view(id);
      });
    }
  };

  App.commands.setHandler('chart:list', function() {
    App.navigate('charts');
    API.list();
  });

  App.commands.setHandler('chart:view', function(id) {
    App.navigate('charts/' + id);
    API.view(id);
  });


  App.addInitializer(function() {
    new Router({
      controller: API
    });
  });

});
