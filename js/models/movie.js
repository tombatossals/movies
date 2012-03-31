define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Movie = Backbone.Model.extend({
        defaults: function() {
                return {
			            id: null,
                        name: null,
                        date: null,
                        thumb: null,
                        url: null
                }
        },
  });
  return Movie;
});
