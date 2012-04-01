define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/showmovie.html',
  'order!libs/bootstrap/bootstrap-modal'
], function($, _, Backbone, templateShowMovie) {

  var ShowMovieView = Backbone.View.extend({
  	    template: _.template(templateShowMovie),
        events: {
            "click .showmovie .btn-close": "close"
        },

  	    initialize: function(options) {
            _.bindAll( this, "close" );
	    },	

        render: function() {
      		$(this.el).html(this.template(this.model.toJSON()));
		    $(this.el).modal();
            return this;
    	},

        close: function(event) {
        	$(this.el).modal("hide");
            return false;
    	}

  });

  return ShowMovieView;
});
