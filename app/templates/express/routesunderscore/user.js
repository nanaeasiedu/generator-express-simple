/*
 * GET users listing.
 */

exports.list = function(app) {
  app.get('/users', function(req, res) {
    res.send('respond with a resource');
  });
};
