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
        _.bindAll( this, "show", "filter");

        this.moviesBasicInfo = new ListaMoviesBasicInfo();
        this.moviesPaginated = new ListaMoviesPaginated();

        this.moviesBasicInfo.fetch({ success: function() {
            Backbone.history.start();
        } });

        this.panelView = new PanelView ( { el: "#panel", collection: this.moviesPaginated, filter: "", items: "" } );
        this.searchView = new SearchView( { el: "#searchForm", collection: this.moviesBasicInfo } );
        this.paginationView = new PaginationView( { el: "#pagination", collection: this.moviesPaginated } );
        this.showMovieView = new ShowMovieView( { el: "#movie" } );
        this.filtersView = new FiltersView( { el: "#filters" } );
        this.movieGalleryView = new MovieGalleryView( { el: "#movies", collection: this.moviesPaginated } );
        this.searchView.on("filter", this.filter);
        this.movieGalleryView.on("showmovie", this.show);
        this.panelView.on("filter", this.filter);
        this.filtersView.on("filter", this.filter);
    },

    eliminateDuplicates: function(arr) {
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
    },

    filter: function(category, filter) {
        $("#" + category).button('toggle');
        this.panelView.filter = category;

        if (category === "letters") {
            this.panelView.items = [ "0-9", "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z" ];
            this.panelView.render();
            if (!filter) {
                filter = "A";
            }
            this.moviesPaginated.query = encodeURIComponent('{ "title": "' + filter + '" }');
        } else if (category === "genre") {
            var genres = [];
            this.moviesBasicInfo.each(function(movie) {
                var genre = movie.get("genre");
                if (genre) {
                    var a = movie.get("genre").split(" / ");
                    genres = genres.concat(a);
                }
            });
            var genres = this.eliminateDuplicates(genres);
            this.panelView.items = genres;
            this.panelView.render();
            if (!filter) {
                filter = genres[0];
            }
            this.moviesPaginated.query = encodeURIComponent('{ "genre": "' + filter + '" }');
        } else if (category === "year") {
            var years = this.eliminateDuplicates(this.moviesBasicInfo.pluck("year"));
            years = years.filter(function(e) {
                if (e !== "null") {
                    return true;
                }
            });
            years.reverse();
            this.panelView.items = years;
            this.panelView.render();
            if (!filter) {
                filter = years[0];
            }
            this.moviesPaginated.query = encodeURIComponent('{ "year": "' + filter + '" }');
        } else {
            this.moviesPaginated.query = "";
        }

        this.panelView.setActive(filter);
        this.moviesPaginated.fetch();

        if (category !== "latest") {
            this.navigate(this.panelView.filter + "/" + filter);
        } else {
            this.navigate(this.panelView.filter);
        }
    },

    show: function(movieId) {
        var movie = this.moviesPaginated.get(movieId);
        this.showMovieView.model = movie;
        this.showMovieView.render();
    },

    defaultAction: function(event) {
        $("#latest").button('toggle');
        this.panelView.hide();
        this.moviesPaginated.query = "";
        this.moviesPaginated.fetch();
    }

  });

  return AppRouter;

});
