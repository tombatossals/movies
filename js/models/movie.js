define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Movie = Backbone.Model.extend({
        defaults: function() {
                return {
			            id: null,
                        name: null,
                        title: null,
                        genre: null,
                        year: null,
                        date: null,
                        thumb: null,
                        url: null
                }
        },
  });
  return Movie;
});
