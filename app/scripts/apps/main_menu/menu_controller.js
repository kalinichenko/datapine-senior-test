define(['app',
  'underscore',
  'marionette',
  'backbone',
  'text!apps/main_menu/templates/main_menu.tmpl'
], function(App, _, Marionette, Backbone, mainMenuTmpl) {
  'use strict';

  var MainMenuModel = Backbone.Model.extend();
  var mainMenuModel = new MainMenuModel();

  var MainMenuView = Marionette.ItemView.extend({
    className: 'main-menu-list',
    template: _.template(mainMenuTmpl),
    tagName: 'ul',
    ui: {
      'homeItem': '.main-menu-list__item--home',
      'aboutItem': '.main-menu-list__item--about'
    },
    triggers: {
      'click @ui.homeItem': 'chart:list',
      'click @ui.aboutItem': 'about:view'
    },
    modelEvents: {
      'change:current': 'currentChanged'
    },
    currentChanged: function() {
      this.$('.main-menu-list__item--current').removeClass('main-menu-list__item--current');
      this.$('.main-menu-list__item--' + this.model.get('current')).addClass('main-menu-list__item--current');
    }

  });

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
