// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/moviesBasicInfo',
  'collections/moviesPaginated',
  'views/search',
  'views/pagination',
  'views/panel',
  'views/moviegallery',
  'views/filters',
  'views/showmovie',
  'order!jquery',
  'order!libs/bootstrap/bootstrap-typeahead',
  'order!libs/bootstrap/bootstrap-button'
], function ($, _, Backbone, ListaMoviesBasicInfo, ListaMoviesPaginated, SearchView, PaginationView, PanelView, MovieGalleryView, FiltersView, ShowMovieView) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      //
      // Default - catch all
      ':cat/:letters': 'filter',
      '*actions': 'defaultAction'
    },

    initialize: function(options) {
        _.bindAll( this, "show", "showFilter");

        this.moviesBasicInfo = new ListaMoviesBasicInfo();
        this.moviesPaginated = new ListaMoviesPaginated();

        this.moviesBasicInfo.fetch();
        this.moviesPaginated.fetch({ success: function() {
            Backbone.history.start();
        } });

        this.panelView = new PanelView ( { filter: "letters", items: [ "0-9", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" ] });
        this.searchView = new SearchView( { el: "#searchForm", collection: this.moviesBasicInfo } );
        this.paginationView = new PaginationView( { el: "#pagination", collection: this.moviesPaginated } );
        this.showMovieView = new ShowMovieView( { el: "#movie" } );
        this.filtersView = new FiltersView( { el: "#filters" } );
        this.movieGalleryView = new MovieGalleryView( { el: "#movies", collection: this.moviesPaginated } );
        this.searchView.on("filterByLetter", this.filter);
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
            this.moviesBasicInfo.each(function(movie) {
                var genre = movie.get("genre");
                if (genre) {
                    var a = movie.get("genre").split(" / ");
                    genres = genres.concat(a);
                }
            });
            var genres = eliminateDuplicates(genres);
            this.panelView.filter = "genre";
            this.items = genres;
        } else if ( filter == "letters" ) {
            this.panelView = new PanelLettersView( { el: "#panel", collection: this.moviesPaginated } );
        } else if ( filter == "year" ) {
            var years = eliminateDuplicates(this.moviesBasicInfo.pluck("year"));
            years = years.filter(function(e) {
                if (e !== "null") {
                    return true;
                }
            });

            years.reverse();
            this.panelView.filter = "year";
            this.panelView.items = years;
        }
    },

    filter: function(category, filter) {
        if (category === "letters") {
            this.moviesPaginated.query = { title: "/" + filter + "/" };
            this.moviesPaginated.fetch();
        }
    },

    show: function(movieId) {
        var movie = this.moviesPaginated.get(movieId);
        this.showMovieView.model = movie;
        this.showMovieView.render();
    },

    defaultAction: function(event) {
        $("#letters").button('toggle');
        //this.showFilter("letters");
        this.moviesPaginated.fetch();
    }

  });

  return AppRouter;

});
