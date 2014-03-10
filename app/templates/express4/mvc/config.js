var config = {
  development: {
    server: {
      port: 3000,
    },
    database: {
      url: 'mongodb://localhost/<%= _.slugify(appname) %>_dev'
    }
  },
  testing: {
    server: {
      port: 3001
    },
    database: {
      url: 'mongodb://localhost/<%= _.slugify(appname) %>_test'
    }
  },
  production: {
    server: {
      port: 8080
    },
    database: {
      url: 'mongodb://localhost/<%= _.slugify(appname) %>'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
