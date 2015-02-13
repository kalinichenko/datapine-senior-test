define(['marionette',
  'jquery',
  'underscore',
  'backbone'
], function(Marionette, $, _, Backbone) {
  'use strict';

  var App = new Marionette.Application({
    regions: {
      menu: '.main-menu',
      content: '.content'
    }
  });

  App.navigate = function(route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  return App;

})
