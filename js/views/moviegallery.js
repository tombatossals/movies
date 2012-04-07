define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/moviegallery.html',
  'order!libs/backbone/backbone.paginator',
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
            this.collection.on("reset", this.render);
        },

        get_popover_placement: function(pop, dom_el) {
            var width = window.innerWidth;
            if (width<500) return 'bottom';
            var left_pos = $(dom_el).offset().left;
            if (width - left_pos > 500) return 'right';
            return 'left';
        },

        render: function() {
            console.log("recarga");
            console.log(this.collection);
      		$(this.el).html(this.template({ movies: this.collection.toJSON()}));
            $("ul#movies > li > a[rel=popover]").popover({ placement: this.get_popover_placement });
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
