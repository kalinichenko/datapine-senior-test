define([
  'app',
  'marionette',
  'underscore',
  'text!apps/about/templates/about.tmpl'
], function(App, Marionette, _, aboutTmpl) {
  'use strict';


  var AboutView = Marionette.ItemView.extend({
    template: _.template(aboutTmpl),
    className: 'grid grid-pad'
  });

  return {
    view: function() {
        App.content.show(new AboutView());
    }
  };
});
