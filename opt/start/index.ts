import server from "../lib/server.js";
import watcher from "../lib/watch.js";
import {routes} from "../build/index.js";



function start(){
   const appDir = 'app';
   const outDir = 'dist';
   return setTimeout(() =>{
      watcher(outDir,appDir);
       setTimeout(() => {
          server(routes);
       },2000);
  },1000);
  
}

start()

export {start}

