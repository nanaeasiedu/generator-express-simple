'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');


function ExpressSimpleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', {
    desc: 'create an express-app with name [appname]',
    type: Boolean,
    required: false,
    defaults: path.basename(process.cwd())
  });

  this.on('end', function () {
    this.installDependencies({skipInstall: options['skip-install']});
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ExpressSimpleGenerator, yeoman.generators.Base);

ExpressSimpleGenerator.prototype.askFor = function () {
  var cb = this.async(),
      root = this;

  console.log('express-simple comes with bootstrap and jquery');

  var prompts = [
    {
      type: 'list',
      name: 'expressVersion',
      message: 'Select the express version you want',
      default: '3.x',
      choices: ['3.x', '4.x']
    },
    {
      type: 'confirm',
      name: 'mvc',
      message: 'Do you want an mvc express app',
      default:  true
    },
    {
      type: 'list',
      name: 'cssPreprocessor',
      message: 'Select the css preprocessor you would like to use',
      default: 'less',
      choices: ['less', 'sass', 'stylus'],

    },
    {
      type: 'list',
      name: 'viewEngine',
      message: 'Select view engine you would like to use',
      default: 'jade',
      choices: ['jade', 'handlebars']
    },
    {
      type: 'list',
      name: 'jsOrCoffee',
      message: 'Do you want your Gruntfile in javascript or coffeescript',
      default: 'javascript',
      choices: ['javascript', 'coffeescript']
    }
  ];

  var answersCallback = (function (answers) {
    this.options.mvc = answers.mvc;
    this.expressVersion = answers.expressVersion;
    this.cssPreprocessor = answers.cssPreprocessor;
    this.cssExt = this.cssPreprocessor === 'stylus' ? 'styl' : (this.cssPreprocessor === 'sass' ? 'scss' : this.cssPreprocessor);
    this.viewEngine = answers.viewEngine === 'handlebars' ? 'hbs' : answers.viewEngine;
    this.jsOrCoffee = answers.jsOrCoffee === 'javascript' ? 'js' : 'coffee';
    cb();
  }).bind(this);

  this.prompt(prompts, answersCallback);
};

ExpressSimpleGenerator.prototype.basicSetup = function () {
  this.mkdir('public');
  this.mkdir('public/' + this.cssPreprocessor);
  this.mkdir('public/vendor');
  this.mkdir('public/img');
  this.mkdir('public/css');
  this.mkdir('public/js');

  this.template('styles.css', 'public/' + this.cssPreprocessor + '/styles.' + this.cssExt);
  this.copy('main.js', 'public/js/main.js');
};

ExpressSimpleGenerator.prototype.viewsSetup = function () {
  this.sourceRoot(path.join(__dirname, 'templates/views'));
  ['layout', 'index', '404'].forEach(function (file) {
    this.template(file + '.html', 'views/' + file + '.' + this.viewEngine);
  }, this);
};

ExpressSimpleGenerator.prototype.setupApp = function () {
  var prefix = 'templates/' + (this.expressVersion === '3.x' ? '' : 'express4/');

  if (this.options.mvc) {
    this.sourceRoot(path.join(__dirname,  prefix + 'mvc'));
    this.directory('.', '.');
  } else {
    this.sourceRoot(path.join(__dirname,  prefix + 'basic'));
    this.directory('.', '.');
  }
};

ExpressSimpleGenerator.prototype.changeDir = function () {
  this.sourceRoot(path.join(__dirname, 'templates', 'common'));
};

ExpressSimpleGenerator.prototype.writePackageJSONFile = function () {
  this.template('.package.json', 'package.json');
};

ExpressSimpleGenerator.prototype.writeBowerJSONFile = function () {
  this.template('.bower.json', 'bower.json');
};

ExpressSimpleGenerator.prototype.projectfiles = function () {
  ['.bowerrc', '.editorconfig', '.gitignore', '.jshintrc'].forEach(function (file) {
    this.copy(file, file);
  }, this);
};

ExpressSimpleGenerator.prototype.writeGruntfile = function () {
  this.sourceRoot(path.join(__dirname, 'templates/gruntfiles'));
  this.template('Gruntfile.' + this.jsOrCoffee, 'Gruntfile.' + this.jsOrCoffee);
};

module.exports = ExpressSimpleGenerator;
