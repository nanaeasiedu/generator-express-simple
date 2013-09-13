/**
 * Home page router
 */<% if (options.mvc) { %>
var homeController = require('../controllers/index');<% } %>

exports.init = function (<% if (options.mvc && db === 'sequelize') { %>Items, app<% } else { %>app<% } %>) {<% if (options.mvc) { %>
  app.get('/', homeController<% if (db === 'sequelize') { %>(Items));<% } else if (db === 'mongoose') { %>);<% } } else { %>
  app.get('/', function (req, res) {
    res.render(<% if (htmlEngine === 'jade') { %>'index'<% } else if (htmlEngine === 'haml') { %>'index.haml'<% } else if (htmlEngine === 'underscore') { %>'index.html'<% } %>, {
      title: 'Express-simple'
    });
  });<% } %>
};
