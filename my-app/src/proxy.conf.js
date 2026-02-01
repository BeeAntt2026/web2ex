const PROXY_CONFIG = [
  {
    context: ['/products'],
    target: 'https://fakestoreapi.com',
    secure: true,
    changeOrigin: true,
    logLevel: 'debug'
  },
  {
    context: ['/api/crypto'],
    target: 'https://api.alternative.me',
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/crypto': '/v1/ticker'
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log('[Proxy] Request:', req.method, req.url, '-> https://api.alternative.me' + req.url.replace('/api/crypto', '/v1/ticker'));
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('[Proxy] Response:', proxyRes.statusCode);
    }
  }
];

module.exports = PROXY_CONFIG;
