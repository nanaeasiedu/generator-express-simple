exports.index = function (req, res) {
  res.render('index', {
    title: '<%= _.slugify(appname) %>'
  });
};
