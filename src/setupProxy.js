const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(proxy('/api', { target: 'http://localhost:5000' }));
  app.use(proxy('/logistics', { target: 'http://localhost:52776' }));
  // app.user(proxy('/'), { target: 'http://localhost:9980' });
};
