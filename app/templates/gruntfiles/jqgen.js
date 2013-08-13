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
for (i; i < cssEnginesLength; i++) {
  allFile = fs.createWriteStream(pre + cssEngines[i] + post);
  allFile.write(defaultFile);
}
for (j; j < htmlEnginesLength; j++) {
  allFile = fs.createWriteStream(pre + htmlEngines[j] + post);
  allFile.write(defaultFile);
}
