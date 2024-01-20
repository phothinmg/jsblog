import { generator, router } from "../lib/generate.js";

function build(){
    const appDir = 'app';
    const outDir = 'dist';
    return generator(outDir, appDir);
}

build();
const routes = router();

export {build,routes}