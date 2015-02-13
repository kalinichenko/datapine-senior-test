define(['app'], function(App) {
  'use strict';

  // App.commands.setHandler('main-menu:current', function(name) {
  //   Controller.setCurrent(name);
  // });

  App.commands.setHandler('main-menu:show', function() {
    require(['apps/main_menu/menu_controller'], function(Controller) {
      Controller.showMenu();
    });
  });
});
