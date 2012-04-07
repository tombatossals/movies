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
                        dateadded: null,
                        thumb: null,
                        plot: null,
                        nfo: null,
                        fanart: null,
                        tbn: null,
                        url: null
                }
        },
        parse: function(response) {
            response.id = response._id;
            delete response._id;
            return response;
        }
  });
  return Movie;
});
