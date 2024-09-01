const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Make sure to use the same path as in your fetch request
    createProxyMiddleware({
      target: 'https://www.swiggy.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // This rewrites '/api' to '' so that the target receives the correct URL
      },
    })
  );
};

