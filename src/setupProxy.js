const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/v1/',
    createProxyMiddleware({
      target: 'http://web:8080',
      changeOrigin: true,
    })
  );
};