/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('express-simple generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('express-simple:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
       'public/less/style.less',
       'views/index.jade',
       'views/404.jade',
       'routes/index.js',
       'bower.json',
       'package.json',
       'Gruntfile.js',
       'app.js',
       '.bowerrc',
       '.editorconfig',
       '.jshintrc',
       '.travis.yml'
    ];

    helpers.mockPrompt(this.app, {
      'supportCssPreprocessor': true,
      'cssPreprocessor': 'less',
      'htmlEngine': 'jade',
      'db': 'mongoose'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
