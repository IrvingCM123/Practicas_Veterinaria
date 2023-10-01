export const environment = {
  production: false,
  url: "http://localhost:3000/api",
  proxyConfig: {
    "/api": {
      target: "https://veterinaria-service-irvingcm123.cloud.okteto.net/api",
      secure: false,
      changeOrigin: true,
    }
  }
};
