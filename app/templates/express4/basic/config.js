var config = {
  development: {
    server: {
      port: 3000
    }
  },
  testing: {
    server: {
      port: 3001
    }
  },
  production: {
    server: {
      port: 8080
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
