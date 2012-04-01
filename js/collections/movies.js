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

        searchByLetter : function(letters){
            if (letters == "") return this;

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
