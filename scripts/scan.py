#!/usr/bin/python
import os
import json
from pymongo import Connection
from xml.sax import make_parser, handler

DIRS=[ "/volume4/video/movies_kids" ]

movies = list()

connection = Connection()
db = connection.movies

db.movies.remove()

class NfoParser(handler.ContentHandler):

    def __init__(self):
        self._elems = 0
        self._attrs = 0
        self._store = [ "year", "title", "plot", "genre" ]
        self._actual = None
        self._data = dict()

    def startElement(self, name, attrs):
        if name in self._store:
            self._actual = name

    def characters(self, content):
        if self._actual:
            if self._data.get(self._actual):
                if not type(self._data[self._actual]) == type(list()):
                    self._data[self._actual] = [ self._data[self._actual] ]
                self._data[self._actual].append(content)
            else:
                self._data[self._actual] = content

    def endElement(self, name):
        self._actual = None

    def endDocument(self):
        return self._data
            
for dir in DIRS:
    for root, dirs, files in os.walk(dir):
        movie = dict()
        name = os.path.basename(root)
        url = root.replace("/volume4/video", "movies")
        if "%s.avi" % name in files or "%s.mkv" % name in files:
            movie["name"] = name
            movie["date-added"] = "2012-03-11"

            if "%s.avi" % name in files:
                movie["url"] = "%s/%s.avi" % ( url, name )
            if "%s.tbn" % name in files:
                movie["tbn"] = "%s/%s.tbn" % ( url, name )
            if "%s-fanart.jpg" % name in files:
                movie["fanart"] = "%s/%s-fanart.jpg" % ( url, name )
            if "%s.nfo" % name in files:
                movie["nfo"] = "%s/%s.nfo" % ( url, name )

                parser = make_parser()
                nfoParser = NfoParser()
                parser.setContentHandler(nfoParser)
                filename = "%s/%s.nfo" % (root, name)
                parser.parse(open(filename, encoding="utf-8"))
                for item, value in nfoParser._data.items():
                    movie[item] = value

            movies.append(movie)
            db.movies.save(movie)

#print(json.dumps(movies))
