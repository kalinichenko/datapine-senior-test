define(['app',
  'underscore',
  'marionette',
  'backbone',
  'apps/main_menu/menu_view'
], function(App, _, Marionette, Backbone, MainMenuView) {
  'use strict';

  var mainMenuModel = new Backbone.Model();

  return {
    showMenu: function() {
      var mainMenuView = new MainMenuView({
        model: mainMenuModel
      });
      mainMenuView.on('chart:list', function() {
        App.commands.execute('chart:list');
      });
      mainMenuView.on('about:view', function() {
        App.commands.execute('about:view');
      });

      App.menu.show(mainMenuView);
    },
    setCurrent: function(name) {
      mainMenuModel.set('current', name);
    }
  };
});
