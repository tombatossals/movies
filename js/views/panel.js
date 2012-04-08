define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/panel.html'
], function($, _, Backbone, templatePanel) {

  var PanelView = Backbone.View.extend({
    	tagName: "div",
        className: "panel",
        template: _.template(templatePanel),

  	    initialize: function(options) {
		    _.bindAll( this, "render", "setActive" );
            this.filter = options.filter;
            this.items = options.items;
	    },	

        hide: function() {
            $(this.el).html("");
        },

        setActive: function(e) {
            var query = "";
            $(this.el).children("ul").children("li").each(function() {
                $(this).removeClass("active");
                if ($(this).children("a").html() === e) {
                    $(this).addClass("active");
                }
            });
        },
        render: function() {
            $(this.el).html(this.template({ filter: this.filter, items: this.items }));
        },

  });

  return PanelView;
});
