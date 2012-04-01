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

        events: {
            "click #movies a.thumbnail": "showmovie"
        },

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
        },

        showmovie: function(ev) {
            var id = $(ev.target).parent("a").attr("href").replace("#", "");
            var movie = this.collection.get(id);
            this.trigger("showmovie", movie);
            return false;
        }
  });

  return MovieGalleryView;
});
