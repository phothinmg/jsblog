import server from "../lib/server.js";
import watcher from "../lib/watch.js";
import { routes } from "../build/index.js";
import data from "../../package.json" assert { type: "json" };

function start() {
  const appDir = data.siteData.production.appDir;
  const outDir = data.siteData.production.outDir;
  return setTimeout(() => {
    watcher(outDir, appDir);
    setTimeout(() => {
      server(routes);
    }, 2000);
  }, 1000);
}

start();

export { start };
