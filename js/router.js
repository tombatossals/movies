// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/movies',
  'views/search',
  'views/panel_letters',
  'views/panel_genre',
  'views/panel_year',
  'views/moviegallery',
  'views/filters',
  'views/showmovie',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-typeahead',
  'order!libs/bootstrap/bootstrap-button'
], function ($, _, Backbone, ListaMovies, SearchView, PanelLettersView, PanelGenreView, PanelYearView, MovieGalleryView, FiltersView, ShowMovieView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      //
      // Default - catch all
      'letters/:letters': 'searchByLetter',
      'year/:year': 'searchByYear',
      'genre/:genre': 'searchByGenre',
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
        function eliminateDuplicates(arr) {
            var i,
                len=arr.length,
                out=[],
                obj={};

            for (i=0;i<len;i++) {
                obj[arr[i]]=0;
            }
            for (i in obj) {
                out.push(i);
            }
            return out;
        }

        if ( filter === "genre" ) {
            var genres = [];
            this.movies.each(function(movie) {
                var genre = movie.get("genre");
                if (typeof(genre) === "object") {
                    genres = genres.concat(genre);
                }
            });
            var genres = eliminateDuplicates(genres);
            this.panelView = new PanelGenreView( { el: "#panel", collection: this.movies, genres: genres } );
        } else if ( filter == "letters" ) {
            this.panelView = new PanelLettersView( { el: "#panel", collection: this.movies } );
        } else if ( filter == "year" ) {
            var years = eliminateDuplicates(this.movies.pluck("year"));
            years.reverse();
            this.panelView = new PanelYearView( { el: "#panel", collection: this.movies, years: years } );
        }
        this.panelView.render();
    },

    show: function(movieId) {
        var movie = this.movies.get(movieId);
        this.showMovieView.model = movie;
        this.showMovieView.render();
    },

    searchByGenre: function(genre) {
        var filteredCollection = new ListaMovies(this.movies.searchByGenre(genre));
        this.movieGalleryView.showFiltered(filteredCollection);
    },

    searchByYear: function(year) {
        var filteredCollection = new ListaMovies(this.movies.searchByYear(year));
        this.movieGalleryView.showFiltered(filteredCollection);
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
