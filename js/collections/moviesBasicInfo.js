define([
  'jquery',
  'underscore',
  'backbone',
  'models/movie'
], function($, _, Backbone, Movie){

  var ListaMoviesBasicInfo = Backbone.Collection.extend({
        model: Movie,
        url: '/api/movies/?fields=title,genre,year',

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
                var g = data.get("genre");
                if (g) {
                    var genres = g.split(" / ");
                    return _.include(genres, genre);
                }
                return false;
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

  return ListaMoviesBasicInfo;
});
