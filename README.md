# generator-express-simple [![Build Status](https://secure.travis-ci.org/ngenerio/generator-express-simple.png?branch=master)](https://travis-ci.org/ngenerio/generator-express-simple)

A simple express generator for [Yeoman](http://yeoman.io).


## Getting Started

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## Overview
Express-generator-simple supports these css preprocessors :
- [less](http://lesscss.org)
- [sass](http://sass-lang.com)
<br></br>and these html template engines :
- [jade](http://jade-lang.com)
- [hamljs](https://github.com/visionmedia/haml.js)
- [underscore](http://documentcloud.github.io/underscore/#template)

## Installing

After installing yo using

```shell
npm install -g yo
```

install generator-express-simple by running

```shell
npm install -g generator-express-simple
```

## Usage
generator-express simple has now support  for mvc-style apps.
To use the mvc scaffolder, just run


```shell
yo express-simple [appname] --mvc
```
appname - optional

The mvc scaffolder has support for only [mongoose](http://mongoosejs.com), a module for [mongodb](www.mongodb.org) and [sequelize](http://sequelizejs.com) database modules which you choose when you are prompted to.

If you do not want any of that, just run

```shell
yo express-simple [appname]
```
Now your app is ready to be run.

## Running
To run app, first run

```shell
grunt
```
in one terminal to generate the basic css files and watch your files as you develop and in another terminal, run :

```shell
node app
``` 
## Contributing
To contribute to this yeoman generator, fork it, play with and send me a pull request at [express-simple-pulls](https://github.com/ngenerio/generator-express-simple/pulls)

## Feature request
If there is anything that you want to be added, just reach me at [@ngenerio](https://twitter.com/ngenerio).
If you can implement that feature, why not, just see the contributing section up there (^).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
