// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/movies',
  'views/search',
  'views/panel',
  'views/moviegallery',
  'views/showmovie',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-typeahead'
], function ($, _, Backbone, ListaMovies, SearchView, PanelView, MovieGalleryView, ShowMovieView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      //
      // Default - catch all
      'search/:letters': 'search',
      'show/movie/:movie': 'show',
      '*actions': 'defaultAction'
    },

    initialize: function(options) {
        _.bindAll( this, "search");
        this.movies = new ListaMovies();
        this.movies.fetch({ success: function() {
            Backbone.history.start();
        } });
        this.searchView = new SearchView( { el: "#searchForm", collection: this.movies } );
        this.showMovieView = new ShowMovieView( { el: "#movie" } );
        this.panelView = new PanelView( { el: "#panel", collection: this.movies } );
        this.movieGalleryView = new MovieGalleryView( { el: "#movies", collection: this.movies } );
        this.movies.on("reset", this.movieGalleryView.render);
        this.movies.on("reset", this.searchView.render);
        this.movies.on("reset", this.panelView.render);
        this.searchView.on("filter", this.search);
    },

    show: function(movieId) {
        var movie = this.movies.get(movieId);
        this.showMovieView.model = movie;
        this.showMovieView.render();
    },

    search: function(letters) {
        if (letters === "all") {
            this.movieGalleryView.collection = this.movies;
            this.movieGalleryView.render();
        } else {
            var filteredCollection = new ListaMovies(this.movies.search(letters));
            this.movieGalleryView.showFiltered(filteredCollection);
        }
    },

    defaultAction: function(event) {
    }

  });

  return AppRouter;

});
