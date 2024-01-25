import { generator, router } from "../lib/generate.js";
import data from "../../package.json" assert { type: "json" };

function build() {
  return generator(
    data.siteData.production.appDir,
    data.siteData.production.outDir
  );
}

build();
const routes = router();

export { build, routes };
