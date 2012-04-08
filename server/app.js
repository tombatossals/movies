#!/usr/bin/env node

var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require('mongoose');

var app = express.createServer();

// Database

mongoose.connect('mongodb://localhost/movies');

// Config

//app.configure('production', function() {
//      app.use(express.logger());
//      app.use(express.errorHandler()); 
//});

app.configure('development', function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.logger());
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

// Launch server

app.listen(4242);

var Schema = mongoose.Schema;  

var Movie = new Schema({  
        id: { type: String, required: true },  
        title: { type: String, required: true },  
        plot: { type: String },
        genre: { type: String },
        url: { type: String },
        nfo: { type: String },
        year: { type: String },
        fanart: { type: String },
        tbn: { type: String },
        dateadded: { type: Date, default: Date.now }
});

var MovieModel = mongoose.model('Movie', Movie);  

app.get('/api/movies', function (req, res){
  var query = MovieModel.find();

  var where = req.query.query || {};

  if (typeof where === "string") {
    where = JSON.parse(where);
  }
  for (w in where) {
    var r = new RegExp("^" + where[w], "i");
    query.where(w, r);
  }
  
  var fields = []; 
  if (req.query.fields) {
      fields = req.query.fields.split(",");
  }
  query.fields(fields);

  var skip = req.query.skip || 0;
  query.skip(skip);

  var limit = req.query.limit || 0; 
  query.limit(limit);

  return query.exec(function (err, movies) {
    if (!err) {
      return res.send(movies);
    } else {
      return console.log(err);
    }
  });
});
