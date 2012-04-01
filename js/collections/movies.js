define([
  'jquery',
  'underscore',
  'backbone',
  'models/movie'
], function($, _, Backbone, Movie){

  var ListaMovies = Backbone.Collection.extend({
        model: Movie,
        url: '/movies/movies',

        comparator: function(model) {
          return model.get('name');
        },

        searchByYear: function(year){
            return this.filter(function(data) {
                return year === data.get("year");
            });
        },

        searchByGenre: function(genre){
            return this.filter(function(data) {
                if (typeof(data.get("genre")) === "object") {
                    return _.include(data.get("genre"), genre);
                } else {
                    return false;
                }
            });
        },

        searchByLetter : function(letters){
            if (letters === "0-9") {
                letters = "[0-9]";
            }

            var pattern = new RegExp("^" + letters, "i");
            return this.filter(function(data) {
                return pattern.test(data.get("name"));
            });
        }
  });

  return ListaMovies;
});
