define([
  'order!jquery',
  'order!underscore',
  'order!backbone',
  'models/movie',
  'order!libs/backbone/backbone.paginator',
], function($, _, Backbone, Movie){

  var ListaMoviesPaginated = Backbone.Paginator.requestPager.extend({
        model: Movie,
        url: '/api/movies/',
        queryAttribute: 'query',
        perPageAttribute: 'limit',
        skipAttribute: 'skip',
        sortAttribute: 'sort',
        orderAttribute: 'orderBy',
        formatAttribute: 'format',
        displayPerPage: 10,
        page: 0,
        fisrtPage: 0,
        perPage: 10,
        sortDirection: 'asc',
        format: 'json',
        sortField: 'title'
  });

  return ListaMoviesPaginated;
});
