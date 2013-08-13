/**
 * Simple algorithm for writing gruntfiles
 *
 */
var fs = require('fs');
var path = require('path');
var pre = 'jq';
var post = '.js';
var cssEngines = ['less', 'scss'];
var htmlEngines = ['jade', 'haml', 'underscore'];
var i = 0;
var j = 0;
var htmlEnginesLength = htmlEngines.length;
var cssEnginesLength = cssEngines.length;
var defaultFile = fs.readFileSync(path.join(__dirname, 'default' + post));
var allFile;
var cssFile;
var htmlFile;
for (i; i < htmlEnginesLength; i++) {
  j = 0;
  for (j; j < cssEnginesLength; j++) {
    allFile = fs.createWriteStream(path.join(__dirname, (pre + htmlEngines[i] + cssEngines[j] + post)));
    allFile.write(defaultFile);
    allFile = fs.createWriteStream(path.join(__dirname, (htmlEngines[i] + cssEngines[j] + post)));
    allFile.write(defaultFile);
  }
  if (i < 2) {
    cssFile = fs.createWriteStream(path.join(__dirname, cssEngines[i] + post));
  }
  htmlFile = fs.createWriteStream(path.join(__dirname, htmlEngines[i] + post));
  cssFile.write(defaultFile);
  htmlFile.write(defaultFile);
}
