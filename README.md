# generator-express-simple [![Build Status](https://secure.travis-ci.org/ngenerio/generator-express-simple.png?branch=master)](https://travis-ci.org/ngenerio/generator-express-simple)
[![NPM version](https://badge.fury.io/js/generator-express-simple.png)](http://badge.fury.io/js/generator-express-simple)

A simple express generator for [Yeoman](http://yeoman.io).


## Getting Started

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Overview

The generator comes with [jquery](http://jquery.com) and [Bootstrap](http://getbootstrap.com)

Express-generator-simple supports these css preprocessors :

- [less](http://lesscss.org)
- [sass](http://sass-lang.com)
- [stylus](http://learnboost.github.io/stylus/)

<br></br>and these html template engines :

- [jade](http://jade-lang.com)
- [handlebars](http://handlebarsjs.com)

## Installing

install generator-express-simple by running

```shell
npm install -g generator-express-simple
```

## Usage
generator-express-simple has now support for mvc-style apps.

In fact, the default is mvc but you will still be asked.

```shell
yo express-simple [appname] --mvc
```
appname - optional

The mvc scaffolder has support for only [mongoose](http://mongoosejs.com), a [mongodb](http://mongodb.org) orm module.

If you do not want any of that, just run

```shell
yo express-simple [appname]
```
Now your app is ready to be run.

## Running
All configurations are in the Gruntfile, to start the server and start developing.
This will start the express app using grunt-nodemon and grunt-concurrent.
Watches the files as you develop and runs the tasks.

Start

```shell
grunt
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
