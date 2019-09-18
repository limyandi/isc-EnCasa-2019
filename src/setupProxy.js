const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function(app) {
  // app.use(proxy('/api', { target: 'http://localhost:5000' }));
  app.use(
    proxy(['/logistics', '/fileserver'], {
      target: `http://localhost:${process.env.IRIS_PORT}`
    })
  );
  app.use(proxy('/notif', { target: 'http://localhost:9999' }));
};
