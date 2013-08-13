'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ExpressSimpleGenerator = module.exports = function ExpressSimpleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ExpressSimpleGenerator, yeoman.generators.Base);


ExpressSimpleGenerator.prototype.app = function app() {
  this.template('express/package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};


ExpressSimpleGenerator.prototype.normalizeWriter = function normalizeWriter() {
  var cb = this.async();
  this.bowerInstall([
    'normalize-css'
  ], {
    save: true
  }, function() {
    cb();
  });
};


ExpressSimpleGenerator.prototype.gruntFileWriter = function gruntFileWriter() {
  this.copy('gruntfiles/default.js', 'Grunfile.js');
};

ExpressSimpleGenerator.prototype.expressFilesWriter = function expressFilesWriter() {
  this.mkdir('public');
  this.mkdir('public/images');
  this.mkdir('public/css');
  this.mkdir('public/js');
  this.mkdir('routes');
  this.mkdir('views');
  this.mkdir('less');

  this.template('express/public/stylesheets/style.css', 'public/css/style.css');
  this.template('express/routes/index.js', 'routes/index.js');
  this.template('express/routes/user.js', 'routes/user.js');
  this.template('express/app.js', 'app.js');
  this.template('express/views/index.jade', 'views/index.jade');
  this.template('express/views/layout.jade', 'views/layout.jade');
  this.template('express/less/style.less', 'less/style.less');
};
