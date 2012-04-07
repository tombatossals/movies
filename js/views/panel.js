define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/panel.html'
], function($, _, Backbone, templatePanel) {

  var PanelView = Backbone.View.extend({
    	tagName: "div",
        className: "panel",
        events: {
  		    "click #alphabetic li": "setActive"
        },

        template: _.template(templatePanel),

  	    initialize: function(options) {
		    _.bindAll( this, "render", "setActive" );
            this.filter = options.filter;
            this.items = options.items;
            this.render();
	    },	

        setActive: function(e) {
            this.collection.fetch();
            $(e.currentTarget).parent("ul").children("li").each(function() {
                $(this).removeClass("active");
            });
            $(e.currentTarget).addClass("active");
        },
        render: function() {
            $(this.el).html(this.template({ filter: this.filter, items: this.items }));
        },

  });

  return PanelView;
});
