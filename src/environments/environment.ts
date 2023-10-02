export const environment = {
  production: false,
  url: "https://veterinaria-service-irvingcm123.cloud.okteto.net/api",
  proxyConfig: {
    "/api": {
      target: "https://veterinaria-service-irvingcm123.cloud.okteto.net/api",
      secure: false,
      changeOrigin: true,
    }
  }
};
