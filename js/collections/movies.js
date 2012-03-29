define([
  'jquery',
  'underscore',
  'backbone',
  'models/movie'
], function($, _, Backbone, Movie){

  var ListaMovies = Backbone.Collection.extend({
        model: Movie,
        url: '/movies/json/movies.json'
  });

  return ListaMovies;
});
