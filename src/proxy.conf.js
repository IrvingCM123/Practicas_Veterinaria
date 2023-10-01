import createProxyMiddleware from 'http-proxy-middleware';
import { environment } from "src/environments/environment";

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware(environment.proxyConfig['/api'])
  );
};
