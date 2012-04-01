define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/search.html',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-typeahead'
], function($, _, Backbone, templateSearch) {

  var SearchView = Backbone.View.extend({
    	tagName: "div",
        className: "search",
        events: {
  		    "change .typeahead": "filtered",
	    },
        template: _.template(templateSearch),
  	    initialize: function(options) {
		    _.bindAll( this, "render", "filtered" );
	    },	

        render: function() {
            $(this.el).html(this.template());
		    this.source = this.collection.pluck("name");
		    $(".typeahead").typeahead( { source: this.source } );
	    },

  	    filtered: function() {
		    var movie = $(".typeahead").val();
		    if (_.include(this.source, movie)) {
                	this.trigger("filterByLetter", movie);
		    }
	    }
  });

  return SearchView;
});
