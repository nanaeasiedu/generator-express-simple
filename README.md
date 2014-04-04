# generator-express-simple [![Build Status](https://secure.travis-ci.org/ngenerio/generator-express-simple.png?branch=master)](https://travis-ci.org/ngenerio/generator-express-simple)
[![NPM version](https://badge.fury.io/js/generator-express-simple.png)](http://badge.fury.io/js/generator-express-simple)

A simple express generator for [Yeoman](http://yeoman.io).


## Getting Started

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Overview

The generator comes with [jquery](http://jquery.com) and [Bootstrap](http://getbootstrap.com).

Newly added functionality is the ability to choose between express 3.x setup and express 4.x.

Get to know more about express 4.x over [here](https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x) and [here](https://github.com/visionmedia/express/wiki/Migrating-from-3.x-to-4.x).

Express-generator-simple supports these css preprocessors :

- [less](http://lesscss.org)
- [sass](http://sass-lang.com)
- [stylus](http://learnboost.github.io/stylus/)

<br></br>and these view engines :

- [jade](http://jade-lang.com)
- [handlebars](http://handlebarsjs.com)
- [ejs](https://github.com/visionmedia/ejs)

Added support for the Gruntfile in either coffeescript or javascript

## Installing

install generator-express-simple by running

```shell
npm install -g generator-express-simple
```

## Usage
```shell
yo express-simple [appname]
```
appname - optional

Now your app is ready to be run.

## Running
All configurations are in the Gruntfile, to start the server and start developing.

Start

```shell
grunt
```
## Contributing
Fork :fork_and_knife: the repo or whatever you want to do then:
  - if it is a fix,
    - create a new branch with the naming convention following this style: fix/[fixname] or fix-[fixname]
  - if it is a new feature,
    - create a new branch with the naming convention following this style: feature/[featurename] or feature-[featurename]

**Make sure the tests are passing and send a pull request.**

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
