/**
 * Home page router
 */<% if (options.mvc) { %>
var homeController = require('../controllers/index.js');<% } %>

exports.init = function (app) {<% if (options.mvc) { %>
  app.get('/', homeController);<% } else { %>
  app.get('/', function (req, res) {<% if (htmlEngine === 'jade') { %>
    res.render('index', {
      title: 'Express-Simple'
    });<% } else if (htmlEngine === 'underscore') { %>
    res.render('index.html', {
      title: 'Express-Simple'
    });<% } else if (htmlEngine === 'haml') { %>
    res.render('index.haml', {
      title: 'Express-Simple'
    });<% } %>
  });
  <% } %>
};
