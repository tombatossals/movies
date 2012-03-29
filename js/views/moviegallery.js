define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/moviegallery.html'
], function($, _, Backbone, templateMovieGallery) {

  var MovieGalleryView = Backbone.View.extend({
    	tagName: "div",
        className: "gallery",
  	    template: _.template(templateMovieGallery),
        initialize: function() {
            _.bindAll(this, "render");
        },
        render: function() {
            console.log(this.collection.toJSON());
      		$(this.el).html(this.template({ movies: this.collection.toJSON()}));
        	return this;
    	}
  });

  return MovieGalleryView;
});
