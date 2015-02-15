define([
  'underscore',
  'marionette',
  'text!apps/main_menu/templates/main_menu.tmpl'
], function(_, Marionette, mainMenuTmpl) {
  'use strict';

  return Marionette.ItemView.extend({
    className: 'main-menu-list',
    template: _.template(mainMenuTmpl),
    tagName: 'ul',
    ui: {
      'homeItem': '.js-main-menu-home',
      'aboutItem': '.js-main-menu-about'
    },
    triggers: {
      'click @ui.homeItem': 'chart:list',
      'click @ui.aboutItem': 'about:view'
    },
    modelEvents: {
      'change:current': 'currentChanged'
    },
    currentChanged: function() {
      this.$('.main-menu-list__link--current')
        .removeClass('main-menu-list__link--current')
        .addClass('main-menu-list__link');
      this.$('.js-main-menu-' + this.model.get('current'))
        .removeClass('main-menu-list__link')
        .addClass('main-menu-list__link--current');
    }
  });
});

