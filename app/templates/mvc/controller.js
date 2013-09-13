<% if (db === 'mongoose') { %>var mongoose = require('mongoose'),
    Items = mongoose.model('Items');

exports.index = module.exports = function (req, res) {
  Items.find(function (err, itemsList) {
    if (err) {
      throw err;
    }
    res.render(<% if (htmlEngine === 'jade') { %>'index'<% } else if (htmlEngine === 'haml') { %>'index.haml'<% } else if (htmlEngine === 'underscore') { %>'index.html'<% } %>, {
      title: 'Express-simple',
      items: items
    });
  });
};<% } else if (db === 'sequelize') { %>
exports.index = module.exports = function (req, res) {
  Items.all().success(function (items) {
    res.render(<% if (htmlEngine === 'jade') { %>'index'<% } else if (htmlEngine === 'haml') { %>'index.haml'<% } else if (htmlEngine === 'underscore') { %>'index.html'<% } %>, {
      title: 'Express-simple',
      items: items
    });
  }).error(function (err) {
    throw err;
  });
};
<% } %>
