// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/movies',
  'views/search',
  'views/leftpanel',
  'views/moviegallery'
], function ($, _, Backbone, ListaMovies, SearchView, LeftPanelView, MovieGalleryView) {
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
        this.searchView = new SearchView( { el: "#searchForm", collection: this.movies } );
        this.leftPanelView = new LeftPanelView( { el: "#left-panel", collection: this.movies } );
        this.movieGalleryView = new MovieGalleryView( { el: "#movies", collection: this.movies } );
        this.movies.on("reset", this.movieGalleryView.render);
        this.movies.on("reset", this.searchView.render);
        this.movies.on("reset", this.leftPanelView.render);
    },

    defaultAction: function(actions){
	    this.mapView.closeall();
    }

  });

  return AppRouter;

});
