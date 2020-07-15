import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import { promises as fs } from "fs";

import cookieSession from "cookie-session";

const app = express();
const port = 3000;
import("../webpack.config.js").then((webpackConfigModule) => {
  const webpackConfig = webpackConfigModule.default;
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
    cookieSession({ name: "session", secret: "my-secret" })
  );

  app.get("/", (req, res) => {
    console.log(req.session);
    controller(req, res);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

async function controller(req, res) {
  const content = await fs.readFile("./src/index.html", "utf-8");
  res.send(content);
}
