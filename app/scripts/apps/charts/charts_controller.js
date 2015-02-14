define([
  'app',
  'marionette',
  'underscore',
  'backbone',
  'text!apps/charts/templates/chart_item.tmpl',
  'text!apps/charts/templates/chart.tmpl',
  'text!apps/charts/templates/chart_type.tmpl',
  'text!apps/charts/templates/chart_layout.tmpl',
  'highcharts'
], function(App, Marionette, _, Backbone, chartItemTmpl, chartTmpl, chartTypeTmpl, chartLayoutTmpl) {
  'use strict';

  var chartItemDef = {
    xAxis: {
      title: {
        text: ''
      },
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels: {
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0
    },
    yAxis: {
      title: {
        text: ''
      },
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels: {
        enabled: false
      },
      minorTickLength: 0,
      tickLength: 0
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    legend: {
      enabled: false
    }
  };

  var merge = function(o1, o2) {
    _.each(Object.keys(o2), function(prop2) {
      if (o1[prop2] === undefined) {
        o1[prop2] = o2[prop2];
      } else if (_.isObject(o2[prop2])) {
        merge(o1[prop2], o2[prop2]);
      }
    });
    return o1;
  };

  var Chart = Backbone.Model.extend({
    urlRoot: '/api/charts'
  });

  var Charts = Backbone.Collection.extend({
    model: Chart,
    url: '/api/charts'
  });

  var ChartView = Marionette.ItemView.extend({
    template: _.template(chartTmpl),
    ui: {
      'chartContainer': '.chart__container'
    },
    modelEvents: {
      'change': 'onShow'
    },
    onShow: function() {
      this.ui.chartContainer.highcharts(this.model.attributes);
    }
  });

  var ChartLayoutView = Marionette.LayoutView.extend({
    template: _.template(chartLayoutTmpl),
    className: 'grid grid-pad',

    regions: {
      chart: '.chart',
      typeChanger: '.chart-type-changer'
    }
  });

  var ChartTypeChangedView = Marionette.ItemView.extend({
    template: _.template(chartTypeTmpl),
    ui: {
      'typeChanger': '.chart__type-changer'
    },
    events: {
      'change @ui.typeChanger': 'changeType'
    },
    changeType: function(event) {
      var selectEl = event.target;
      this.trigger('chart:change-type', selectEl.options[selectEl.selectedIndex].value);
    }
  });

  var ChartItemView = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'charts__item col-1-4',
    template: _.template(chartItemTmpl),
    ui: {
      'chartsContainer': '.charts-item-container__chart',
      'chartsLink': '.charts-item-container__link'
    },
    triggers: {
      'click @ui.chartsLink': 'chart:view'
    },
    onShow: function() {
      this.ui.chartsContainer.highcharts(merge(_.extend({}, this.model.attributes), chartItemDef));
    }
  });
  var ChartCollectionView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'charts grid grid-pad',
    childView: ChartItemView
  });


  return {
    list: function() {
      var charts = new Charts();
      charts.fetch().done(function() {
        var chartCollectionView = new ChartCollectionView({
          collection: charts
        });
        chartCollectionView.on('childview:chart:view', function(childView) {
          App.commands.execute('chart:view', childView.model.id);
        });
        App.content.show(chartCollectionView);
      });
    },
    view: function(_id) {
      var chart = new Chart({
        id: _id
      });
      chart.fetch().done(function() {
        var chartLayoutView = new ChartLayoutView();
        App.content.show(chartLayoutView);
        chartLayoutView.chart.show(new ChartView({
          model: chart
        }));
        var chartTypeChangedView = new ChartTypeChangedView({
          model: chart
        });
        chartLayoutView.typeChanger.show(chartTypeChangedView);
        chartTypeChangedView.on('chart:change-type', function(_type) {
          var chartAttr = _.extend({}, this.model.get('chart'), {
            type: _type
          });
          chart.set('chart', chartAttr);
        });
      });
    }

  };
});
