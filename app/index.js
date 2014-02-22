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
  if (this.options.mvc) {
    this.sourceRoot(path.join(__dirname, 'templates/mvc'));
    this.directory('.', '.');
  } else {
    this.sourceRoot(path.join(__dirname, 'templates/basic'));
    this.directory('.', '.');
  }
};

ExpressSimpleGenerator.prototype.writePackageJSONFile = function () {
  var packageJSON = {
    name: this.appname,
    version: '0.0.0',
    dependencies: {
      'express': '~3.4.8'
    },
    devDependencies: {
      'grunt': '~0.4.2',
      'grunt-contrib-jshint': '~0.8.0',
      'grunt-contrib-watch': '~0.5.3',
      'grunt-concurrent': '~0.4.3',
      'grunt-nodemon': '~0.2.0',
      'grunt-node-inspector': '~0.1.2',
      'grunt-contrib-cssmin': '~0.8.0'
    }
  };

  if (this.options.mvc) {
    packageJSON.dependencies.mongoose = '~3.8.7';
  }

  if (this.viewEngine === 'jade') {
    packageJSON.dependencies.jade = '~1.1.5';
  } else {
    packageJSON.dependencies['express-hbs'] = '~0.7.9';
  }

  switch (this.cssPreprocessor) {
    case 'less':
      packageJSON.devDependencies['grunt-contrib-less'] = '~0.9.0';
    break;
    case 'scss':
      packageJSON.devDependencies['grunt-contrib-sass'] = '~0.7.2';
    break;
    case 'stylus':
      packageJSON.devDependencies['grunt-contrib-stylus'] = '~0.12.0';
    break;
  }

  this.write('package.json', JSON.stringify(packageJSON, null, 2));
};

ExpressSimpleGenerator.prototype.writeBowerJSONFile = function () {
   var bowerJSON = {
    name: this.appname,
    version: '0.0.0',
    dependencies: {
      'jquery': '~2.1.0',
      'bootstrap': '~3.1.0'
    }
  };

  this.write('bower.json', JSON.stringify(bowerJSON, null, 2));
};

ExpressSimpleGenerator.prototype.projectfiles = function () {
  this.sourceRoot(path.join(__dirname, 'templates', 'common'));
  this.directory('.', '.');
};

ExpressSimpleGenerator.prototype.writeGruntfile = function () {
  this.sourceRoot(path.join(__dirname, 'templates/gruntfiles'));
  this.template('Gruntfile.' + this.jsOrCoffee, 'Gruntfile.' + this.jsOrCoffee);
};

module.exports = ExpressSimpleGenerator;
