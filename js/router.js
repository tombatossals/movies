// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/movies',
  'views/search',
  'views/panel_letters',
  'views/panel_genre',
  'views/moviegallery',
  'views/filters',
  'views/showmovie',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-typeahead',
  'order!libs/bootstrap/bootstrap-button'
], function ($, _, Backbone, ListaMovies, SearchView, PanelLettersView, PanelGenreView, MovieGalleryView, FiltersView, ShowMovieView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      //
      // Default - catch all
      'letters/:letters': 'searchByLetter',
      '*actions': 'defaultAction'
    },

    initialize: function(options) {
        _.bindAll( this, "searchByLetter", "show", "showFilter");
        this.movies = new ListaMovies();
        this.movies.fetch({ success: function() {
            Backbone.history.start();
        } });
        this.searchView = new SearchView( { el: "#searchForm", collection: this.movies } );
        this.showMovieView = new ShowMovieView( { el: "#movie" } );
        this.filtersView = new FiltersView( { el: "#filters " } );
        this.filtersView.render();
        this.panelView = new PanelLettersView( { el: "#panel", collection: this.movies } );
        this.panelView.render();
        this.movieGalleryView = new MovieGalleryView( { el: "#movies", collection: this.movies } );
        this.movies.on("reset", this.movieGalleryView.render);
        this.movies.on("reset", this.searchView.render);
        this.searchView.on("filterByLetter", this.searchByLetter);
        this.movieGalleryView.on("showmovie", this.show);
        this.filtersView.on("filter", this.showFilter);
    },

    showFilter: function(filter) {
        if ( filter === "genre" ) {
            this.panelView = new PanelGenreView( { el: "#panel", collection: this.movies } );
        } else if ( filter == "letters" ) {
            this.panelView = new PanelLettersView( { el: "#panel", collection: this.movies } );
        }
        this.panelView.render();
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
