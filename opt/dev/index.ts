import { generator, router } from "../lib/generate.js";
import server from "../lib/server.js";
import watcher from "../lib/watch.js";
import data from "../../package.json" assert { type: "json" };

function dev() {
  const appDir = data.siteData.development.appDir;
  const outDir = data.siteData.development.outDir;
  return setTimeout(() => {
    watcher(outDir, appDir);
    setTimeout(() => {
      generator(outDir, appDir);
      setTimeout(() => {
        const aa = router();
        setTimeout(() => {
          server(aa);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 1000);
}

dev();

export { dev };
