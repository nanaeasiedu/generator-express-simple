/*
 * GET home page.
 */

exports.index = function(app) {
  app.get('/', function(req, res) {
    res.render('index.html', {
      title: 'Express'
    });
  });
};
