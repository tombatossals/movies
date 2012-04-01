define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/panel_year.html'
], function($, _, Backbone, templatePanelYear) {

  var PanelYearView = Backbone.View.extend({
    	tagName: "div",
        className: "panel-genre",
        events: {
  		    "click #year li": "setActive"
        },

        template: _.template(templatePanelYear),

  	    initialize: function(options) {
		    _.bindAll( this, "render", "setActive" );
            this.years = options.years;
	    },	

        setActive: function(e) {
            $(e.currentTarget).parent("ul").children("li").each(function() {
                $(this).removeClass("active");
            });
            $(e.currentTarget).addClass("active");
        },

        render: function() {
            $(this.el).html(this.template({ years: this.years }));
	    },

  });

  return PanelYearView;
});
