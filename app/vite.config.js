// vite.config.js in takehome/app
export default {
  server: {
    proxy: {
      "/api": {
        target: "http://api",
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
}