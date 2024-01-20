import { generator, router } from "../lib/generate.js";
import server from "../lib/server.js";
import watcher from "../lib/watch.js";

    
  function dev(){
    const appDir = 'app';
    const outDir = 'node_modules/.jsb';
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

  dev();

  export {dev}
   

