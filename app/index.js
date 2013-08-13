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
  this.packageJSON = JSON.parse(this.readFileAsString(path.join(__dirname, 'templates/express/jsonsData/package.json')));
};

util.inherits(ExpressSimpleGenerator, yeoman.generators.Base);

ExpressSimpleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [{
    type: 'confirm',
    name: 'jquery',
    message: 'Do you want to install jquery in your app?',
    default: false
  }, {
    type: 'confirm',
    name: 'html_engine_confirm',
    message: 'do you want any html engine to be installed?',
    default: true
  }, {
    type: 'list',
    name: 'html_engine',
    message: 'please select your css engine : ',
    choices: ['jade', 'haml', 'underscore'],
    default: 'jade',
    when: function(answers) {
      if (Boolean(answers.html_engine_confirm)) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    type: 'confirm',
    name: 'css_engine_confirm',
    message: 'do you want an css engine to be installed',
    default: true
  }, {
    type: 'list',
    name: 'css_engine',
    message: 'please select your css engine',
    choices: ['scss', 'less'],
    default: 'less',
    when: function(answers) {
      if (Boolean(answers.css_engine_confirm)) {
        return true;
      } else {
        return false;
      }
    }
  }];
  this.prompt(prompts, function(props) {
    this.jquery = props.jquery;
    this.html_engine_confirm = props.html_engine_confirm;
    this.html_engine = props.html_engine;
    this.css_engine_confirm = props.css_engine_confirm;
    this.css_engine = props.css_engine;
    cb();
  }.bind(this));
};

ExpressSimpleGenerator.prototype.bowerWriter = function bowerWriter() {
  this.copy('_bower.json', 'bower.json');
};

ExpressSimpleGenerator.prototype.jqueryWriter = function jqueryWriter() {
  var cb = this.async();
  if (this.jquery) {
    console.log('installing jquery');
    this.bowerInstall(['jquery'], {
      save: true
    });
  }
  cb();
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

ExpressSimpleGenerator.prototype.jsonWriter = function jsonWriter() {
  this.cssEngineHash = {
    less: ['grunt-contrib-less', '~0.6.4'],
    scss: ['grunt-sass', '*'],
  };
  var packageJSON = this.packageJSON;
  if (this.html_engine_confirm) {
    if (this.html_engine === 'haml') {
      packageJSON.dependencies[this.html_engine + 'js'] = '*';
    } else {
      packageJSON.dependencies[this.html_engine] = '*';
    }
  }
  if (this.css_engine_confirm) {
    packageJSON.devDependencies[this.cssEngineHash[this.css_engine][0]] = this.cssEngineHash[this.css_engine][1]
  }
  this.write('package.json', JSON.stringify(packageJSON, null, 2))
};

ExpressSimpleGenerator.prototype.gruntFileWriter = function gruntFileWriter() {
  var cssConfirm = this.css_engine_confirm;
  var htmlConfirm = this.html_engine_confirm;

  if (this.jquery && this.html_engine_confirm && this.css_engine_confirm) {
    this.copy('gruntfiles/jq' + this.html_engine + this.css_engine + '.js', 'Gruntfile.js');
  } else if (this.jquery && this.html_engine_confirm) {
    this.copy('gruntfiles/jq' + this.html_engine + '.js', 'Gruntfile.js');
  } else if (this.jquery && this.css_engine_confirm) {
    this.copy('gruntfiles/jq' + this.css_engine + '.js', 'Gruntfile.js');
  } else if (this.html_engine_confirm && this.css_engine_confirm) {
    this.copy('gruntfiles/' + this.html_engine + this.css_engine + '.js', 'Gruntfile.js');
  } else if (this.html_engine_confirm) {
    this.copy('gruntfiles/' + this.html_engine + '.js', 'Gruntfile.js');
  } else if (this.css_engine_confirm) {
    this.copy('gruntfiles/' + this.css_engine + '.js', 'Gruntfile.js');
  } else {
    this.copy('gruntfiles/default.js', 'Gruntfile.js');
  }
};

ExpressSimpleGenerator.prototype.expressFilesWriter = function expressFilesWriter() {
  this.mkdir('public');
  this.mkdir('public/images');
  this.mkdir('public/css');
  this.mkdir('public/js');
  this.mkdir('routes');
  this.mkdir('views');
  this.copy('express/public/stylesheets/style.css', 'public/css/style.css');
  if (this.html_engine_confirm) {
    this.copy('express/routes' + this.html_engine + '/index.js', 'routes/index.js');
    this.copy('express/routes' + this.html_engine + '/user.js', 'routes/user.js');
  }
  if (this.html_engine_confirm) {
    this.copy('express/apps/app' + this.html_engine + '.js', 'app.js');
  }
  if (this.css_engine_confirm) {
    this.mkdir(this.css_engine);
    this.copy('express/styles/style.' + this.css_engine, this.css_engine + '/style.' + this.css_engine);
  }

  if (this.jquery && this.html_engine_confirm) {
    if (this.html_engine === 'jade') {
      this.copy('express/views/jqindex.jade', 'views/index.jade');
      this.copy('express/views/layout.jade', 'views/layout.jade');
    } else if (this.html_engine === 'underscore') {
      this.copy('express/views/jq' + this.html_engine + '.html', 'views/index.html');
    } else {
      this.copy('express/views/jq' + this.html_engine + '.' + this.html_engine, 'views/index.haml');
    }
    this.copy('jquery/jquery.min.js', 'public/js/jquery.min.js');
  } else if (this.jquery) {
    this.copy('jquery/jquery.min.js', 'public/js/jquery.min.js');
  } else if (this.html_engine_confirm) {
    if (this.html_engine === 'jade') {
      this.copy('express/views/index.jade', 'views/index.jade');
      this.copy('express/views/layout.jade', 'views/layout.jade');
    } else if (this.html_engine === 'underscore') {
      this.copy('express/views/index.html', 'views/index.html');
    } else {
      this.copy('express/views/index.' + this.html_engine, 'views/index.haml');
    }
    this.copy('jquery/jquery.min.js', 'public/js/jquery.min.js');
  }
};
