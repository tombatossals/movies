// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/movies',
  'views/moviegallery',
], function ($, _, Backbone, ListaMovies, SearchView, MovieGalleryView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      //
      // Default - catch all
      '*actions': 'defaultAction'
    },

    initialize: function(options) {
        this.movies = new ListaMovies();
        this.movies.fetch();
        this.searchView = new SearchView( { el: "#search", collection: this.movies } );
        this.movieGalleryView = new MovieGalleryView( { el: "#movies", collection: this.movies } );
        this.movies.on("reset", this.movieGalleryView.render);
    },

    defaultAction: function(actions){
	    this.mapView.closeall();
    }

  });

  return AppRouter;

});
