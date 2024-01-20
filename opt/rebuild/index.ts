import server from "../lib/server.js";
import watcher from "../lib/watch.js";
import { generator, router } from "../lib/generate.js";

function rebuild(outDir:string, appDir:string){
    return  setTimeout(() => {
        watcher(outDir, appDir);
         setTimeout(() => {
            generator(outDir, appDir);
                setTimeout(() => {
                    const aa = router();
                     setTimeout(() => {
                        server(aa);
                     },2000);
                },2000);
         }, 2000);
    }, 1000);
}

export default rebuild;