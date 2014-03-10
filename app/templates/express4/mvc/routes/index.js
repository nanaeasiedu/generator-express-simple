var controllers = require('../controllers');

module.exports = function (app) {
  app.get('/', controllers.index);
};
