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
      		$(this.el).html(this.template({ movies: this.collection.toJSON()}));

            $("ul#movies > li > a[rel=popover]").popover();
            $("ul#movies > li > a").hover(function() {
                $(this).popover('show');
            }, function() {
                $(this).popover('hide');
            });

        	return this;
    	}
  });

  return MovieGalleryView;
});
