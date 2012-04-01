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
  		    "click #alphabetic li": "setActive"
        },

        template: _.template(templatePanelGenre),

  	    initialize: function(options) {
		    _.bindAll( this, "render", "setActive" );
	    },	

        setActive: function(e) {
            $(e.currentTarget).parent("ul").children("li").each(function() {
                $(this).removeClass("active");
            });
            $(e.currentTarget).addClass("active");
        },

        reset: function() {
        },

        render: function() {
            $(this.el).html(this.template());
		    this.source = this.collection.pluck("name");
		    $(".typeahead").typeahead( { source: this.source } );
	    },

  });

  return PanelGenreView;
});
