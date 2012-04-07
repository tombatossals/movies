define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/pagination.html',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-typeahead'
], function($, _, Backbone, templatePagination) {

  var PaginationView = Backbone.View.extend({
    	tagName: "div",
        className: "pagination",
        events: {
            'click a.servernext': 'nextResultPage',
            'click a.serverprevious': 'previousResultPage',
	    },
        template: _.template(templatePagination),
  	    initialize: function(options) {
		    _.bindAll( this, "render", "filtered" );
            this.collection.on("reset", this.render);
	    },	

        render: function() {
            $(this.el).html(this.template());
		    this.source = this.collection.pluck("title");
		    $(".typeahead").typeahead( { source: this.source } );
	    },

  	    filtered: function() {
		    var movie = $(".typeahead").val();
		    if (_.include(this.source, movie)) {
                	this.trigger("filterByLetter", movie);
		    }
	    },
        nextResultPage: function (e) {
            e.preventDefault();
            this.collection.requestNextPage();
        },

        previousResultPage: function (e) {
            e.preventDefault();
            this.collection.requestPreviousPage();
        },


  });

  return PaginationView;
});
