define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/panel_letters.html'
], function($, _, Backbone, templatePanelLetters) {

  var PanelLettersView = Backbone.View.extend({
    	tagName: "div",
        className: "search",
        events: {
  		    "click #alphabetic li": "setActive"
        },

        template: _.template(templatePanelLetters),

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

  return PanelLettersView;
});
