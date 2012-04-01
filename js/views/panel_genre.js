define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/panel_genre.html'
], function($, _, Backbone, templatePanelGenre) {

  var PanelGenreView = Backbone.View.extend({
    	tagName: "div",
        className: "panel-genre",
        events: {
  		    "click #genre li": "setActive"
        },

        template: _.template(templatePanelGenre),

  	    initialize: function(options) {
		    _.bindAll( this, "render", "setActive" );
            this.genres = options.genres;
	    },	

        setActive: function(e) {
            $(e.currentTarget).parent("ul").children("li").each(function() {
                $(this).removeClass("active");
            });
            $(e.currentTarget).addClass("active");
        },

        render: function() {
            $(this.el).html(this.template({ genres: this.genres }));
	    },

  });

  return PanelGenreView;
});