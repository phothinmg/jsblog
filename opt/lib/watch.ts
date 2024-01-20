import chokidar from 'chokidar';
import chalk from 'chalk';
import { generator } from './generate.js';
import rebuild from '../rebuild/index.js';


export default function watcher(outDir: string,appDir: string){
    console.log(chalk.bgBlack.yellow.bold('MINGALARPAR  🙏🙏🙏 .....'));
    const watch = chokidar.watch(appDir, {
        ignoreInitial: true,
    });
    watch
     .on('all', (event, changePath) => {
        console.log (chalk.yellow(`${changePath} has been changed.Reloading ...`));
        rebuild(outDir,appDir);
     })
     .on('error', (error) => {
        console.error(chalk.magenta(`Watcher error: ${error}`));
      })
      .on('ready', () => {
        console.log(chalk.bgBlack.green('Ready to watch'));
      });
}