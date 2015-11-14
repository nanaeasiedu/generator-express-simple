/**
 * Module dependencies.
 */

var express  = require('express');
var path     = require('path');<% if (viewEngine === 'hbs') { %>
var hbs      = require('express-hbs');<% } %>
var config   = require('./config');
var routes   = require('./routes');



var app = express();

<% if (viewEngine === 'hbs') { %>/**
 * A simple if condtional helper for handlebars
 *
 * Usage:
 *   {{#ifvalue env value='development'}}
 *     do something marvellous
 *   {{/ifvalue}}
 * For more information, check out this gist: https://gist.github.com/pheuter/3515945
 */
hbs
  .registerHelper('ifvalue', function (conditional, options) {
    if (options.hash.value === conditional) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });<% } %>

/**
 * Express configuration.
 */
app
  .set('port', config.server.port)<% if (viewEngine === 'hbs') { %>
  .engine('hbs', hbs.express3())<% } %>
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', '<%= viewEngine %>');

app
  .use(express.compress())
  .use(express.favicon())
  .use(express.logger('dev'))
  .use(express.json())
  .use(express.urlencoded())
  .use(express.methodOverride())
  .use(app.router)
  .use(express.static(path.join(__dirname, 'public')))
  .use(function (req, res) {
    res.status(404).render('404', {title: 'Not Found :('});
  });

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

routes(app);

app
  .listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
