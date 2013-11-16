# generator-express-simple [![Build Status](https://secure.travis-ci.org/ngenerio/generator-express-simple.png?branch=master)](https://travis-ci.org/ngenerio/generator-express-simple)

A simple express generator for [Yeoman](http://yeoman.io).


## Getting Started

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Overview

The generator comes with [jquery](http://jquery.com) and [normalize-css](https://github.com/necolas/normalize.css) and optional [Bootstrap](http://getbootstrap.com)

Express-generator-simple supports these css preprocessors :

- [less](http://lesscss.org)
- [sass](http://sass-lang.com)

<br></br>and these html template engines :

- [jade](http://jade-lang.com)
- [hamljs](https://github.com/visionmedia/haml.js)
- [underscore](http://documentcloud.github.io/underscore/#template)

## Installing

install generator-express-simple by running

```shell
npm install -g generator-express-simple
```

## Usage
generator-express-simple has now support  for mvc-style apps.
To use the mvc scaffolder, just run


```shell
yo express-simple [appname] --mvc
```
appname - optional

The mvc scaffolder has support for only [mongoose](http://mongoosejs.com), a [mongodb](http://mongodb.org) module and [sequelize](http://sequelizejs.com) database modules which you choose when you are prompted to.

If you do not want any of that, just run

```shell
yo express-simple [appname]
```
Now your app is ready to be run.

## Running
All configurations are in the Gruntfile, to start the server and start developping run, this will start the express app using grunt-nodemon and grunt-concurrent.Watches the files as you develop and runs the tasks.

There are configurations that you have to take a look at and configure to suit your needs.

To run the default grunt task use,

```shell
grunt
```

To run the grunt server task that waches the server files as you develop and restarts the server using nodemon, run this tasks:

```shell
grunt server
```
To debug the application run,
```shell
grunt debug
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
