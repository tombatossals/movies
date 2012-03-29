#!/usr/bin/python
import os
import json

DIRS=[ "/volume4/video/movies_kids" ]

movies = list()

for dir in DIRS:
    for root, dirs, files in os.walk(dir):
        movie = dict()
        name = os.path.basename(root)
        root = root.replace("/volume4/video", "movies")
        if "%s.avi" % name in files or "%s.mkv" % name in files:
            movie["name"] = name
            movie["date-added"] = "2012-03-11"
            movie["url"] = root
            if "%s.tbn" % name in files:
                movie["tbn"] = "%s/%s.tbn" % ( root, name )
            if "%s-fanart.jpg" % name in files:
                movie["fanart"] = "%s/%s-fanart.jpg" % ( root, name )
            if "%s.nfo" % name in files:
                movie["nfo"] = "%s/%s.nfo" % ( root, name )

            movies.append(movie)

print(json.dumps(movies))
