#!/usr/bin/python
import os
import json
from pymongo import Connection
from xml.sax import make_parser, handler

DIRS=[ "/volume4/video/movies_kids", "/volume4/video/movies_gold" ]

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
        if [ a for a in files if a[-4:] == ".avi" ]:
            movie["name"] = name
            movie["dateadded"] = "2012-03-11"

            if [ a for a in files if a[-4:] == ".avi" ]:
                movie["url"] = "%s/%s" % (url, [ a for a in files if a[-4:] == ".avi" ][0])

            if [ a for a in files if a[-4:] == ".tbn" ]:
                movie["tbn"] = "%s/%s" % (url, [ a for a in files if a[-4:] == ".tbn" ][0])
                print(movie["tbn"]);
            if [ a for a in files if a[-4:] == ".jpg" ]:
                movie["fanart"] = "%s/%s" % (url, [ a for a in files if a[-4:] == ".jpg" ][0])
            if [ a for a in files if a[-4:] == ".nfo" ]:
                movie["nfo"] = "%s/%s" % (url, [ a for a in files if a[-4:] == ".nfo" ][0])

                parser = make_parser()
                nfoParser = NfoParser()
                parser.setContentHandler(nfoParser)
                filename = "%s/%s" % (root, [ a for a in files if a[-4:] == ".nfo" ][0])
                parser.parse(open(filename, encoding="utf-8"))
                for item, value in nfoParser._data.items():
                    movie[item] = value

            movies.append(movie)
            db.movies.save(movie)

#print(json.dumps(movies))
