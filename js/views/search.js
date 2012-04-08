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
            this.collection.on("reset", this.render);
	    },	

        render: function() {
            $(this.el).html(this.template());
		    this.source = this.collection.pluck("title");
            this.source.sort();
            this.source = this.source.filter(function(e) {
                if (e !== null) {
                    return true;
                }
            });
		    $(".typeahead").typeahead( { source: this.source } );
	    },

  	    filtered: function() {
		    var movie = $(".typeahead").val();
		    if (_.include(this.source, movie)) {
                	this.trigger("filter", "letters", movie);
		    }
	    }
  });

  return SearchView;
});
