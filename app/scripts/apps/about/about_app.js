define(['app',
  'marionette'
], function(App, Marionette) {
  'use strict';

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      'about': 'view',
    }
  });

  var API = {
    view: function() {
      require(['apps/about/about_controller'], function(Controller) {
        Controller.view();
      });
    }
  };

  App.commands.setHandler('about:view', function() {
    App.navigate('about');
    API.view();
  });

  App.addInitializer(function() {
    new Router({
      controller: API
    });
  });

});
