define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/moviegallery.html',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-tooltip',
  'order!libs/bootstrap/bootstrap-popover'
], function($, _, Backbone, templateMovieGallery) {

  var MovieGalleryView = Backbone.View.extend({
    	tagName: "div",
        className: "gallery",
  	    template: _.template(templateMovieGallery),

        initialize: function() {
            _.bindAll(this, "render");
        },

        render: function() {
      		$(this.el).html(this.template({ movies: this.collection.toJSON()}));

            $("ul#movies > li > a[rel=popover]").popover();
            $("ul#movies > li > a").hover(function() {
                $(this).popover('show');
            }, function() {
                $(this).popover('hide');
            });

        	return this;
    	},

        showFiltered: function(collection) {
            this.collection = collection;
            this.render();
        }
  });

  return MovieGalleryView;
});
