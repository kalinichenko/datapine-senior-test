define([
  'apps/main_menu/menu_view'
], function(MenuView) {
  'use strict';

  var view;
  var eventSuccessSpy;

  describe('MenuView', function () {
    describe('events', function () {
      describe('click .js-main-menu-home', function () {
        it('triggers chart:list', function () {
          view = new MenuView();
          view.render();
          eventSuccessSpy = sinon.spy();
          view.on('chart:list', eventSuccessSpy);
          view.$('.js-main-menu-home').click();
          expect(eventSuccessSpy.callCount).to.equal(1);
        });
      });
      describe('click .js-main-menu-about', function () {
        it('triggers about:view', function () {
          view = new MenuView();
          view.render();
          eventSuccessSpy = sinon.spy();
          view.on('about:view', eventSuccessSpy);
          view.$('.js-main-menu-about').click();
          expect(eventSuccessSpy.callCount).to.equal(1);
        });
      });
    });
  });
});
