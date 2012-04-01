define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/filters.html'
], function($, _, Backbone, templateFilters) {

  var FiltersView = Backbone.View.extend({
    	tagName: "div",
        className: "filters",
        events: {
  		    "click #filters button": "filter"
        },

        template: _.template(templateFilters),

  	    initialize: function(options) {
		    _.bindAll( this, "render" );
	    },	

        render: function() {
            $(this.el).html(this.template());
	    },

        filter: function(ev) {
            var filter = $(ev.target).attr("id");
            this.trigger("filter", filter);
        }

  });

  return FiltersView;
});
