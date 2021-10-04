const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://unnamed-django:8000',
      changeOrigin: true,
      secure: false,
    })
  );
};
