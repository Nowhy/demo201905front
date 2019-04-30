export default {
  "publicPath": "/static/",
  "proxy":
  {
    "/api":
    {
      "target": "http://localhost:1337",
      "changeOrigin": true,
      "pathRewrite":
      {
        "^/api" : ""
      }
    }
  }
}
