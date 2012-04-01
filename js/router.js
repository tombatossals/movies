// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/movies',
  'views/search',
  'views/panel_letters',
  'views/moviegallery',
  'views/showmovie',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-typeahead'
], function ($, _, Backbone, ListaMovies, SearchView, PanelLettersView, MovieGalleryView, ShowMovieView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      //
      // Default - catch all
      'letters/:letters': 'searchByLetter',
      '*actions': 'defaultAction'
    },

    initialize: function(options) {
        _.bindAll( this, "searchByLetter", "show");
        this.movies = new ListaMovies();
        this.movies.fetch({ success: function() {
            Backbone.history.start();
        } });
        this.searchView = new SearchView( { el: "#searchForm", collection: this.movies } );
        this.showMovieView = new ShowMovieView( { el: "#movie" } );
        this.panelLettersView = new PanelLettersView( { el: "#panel", collection: this.movies } );
        this.movieGalleryView = new MovieGalleryView( { el: "#movies", collection: this.movies } );
        this.movies.on("reset", this.movieGalleryView.render);
        this.movies.on("reset", this.searchView.render);
        this.movies.on("reset", this.panelLettersView.render);
        this.searchView.on("filterByLetter", this.searchByLetter);
        this.movieGalleryView.on("showmovie", this.show);
    },

    show: function(movieId) {
        var movie = this.movies.get(movieId);
        this.showMovieView.model = movie;
        this.showMovieView.render();
    },

    searchByLetter: function(letters) {
        var filteredCollection = new ListaMovies(this.movies.searchByLetter(letters));
        this.movieGalleryView.showFiltered(filteredCollection);
    },

    defaultAction: function(event) {
        this.movieGalleryView.collection = this.movies;
        this.movieGalleryView.render();
    }

  });

  return AppRouter;

});
