const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "0.0.0.0";
const API_SERVICE_URL = "https://n7b67.sse.codesandbox.io";

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(
  "/graphql_proxy",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/graphql_proxy`]: "",
    },
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
