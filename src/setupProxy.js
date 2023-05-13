const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://80.90.182.161:5000',
      changeOrigin: true,
    }),
  )
}
