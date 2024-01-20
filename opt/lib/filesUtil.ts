import { globSync } from "glob";
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

type getFileProps = {
  outDir: string;
  dir: string;
  ext: string
}
function getFiles ({outDir, dir, ext}: getFileProps){
    const cwd = process.cwd();
    const exclude = ['node_modules/**', outDir]
    const globPath = dir === undefined ? cwd : path.join(cwd, dir);
    const files = globSync(`${globPath}/**/*.${ext}`, { ignore: exclude.map(folder => `**/${folder}/**`) });
    if(!files || files.length === 0){
        console.log(chalk.bgBlack.red.bold('Error : file ext not found!'))
    } else {
        return files
    }
    
};

const isDir = (path:string) => {
    try {
        return fs.statSync(path).isDirectory();
    } catch {
        return false;
    }
};
const isFile = ( path: string) => {
  try {
    const stat = fs.lstatSync(path);
    return stat.isFile();
  } catch {
    return false;
  }
};

const copy = (sf: string, tf: string) => {
    try {
      fs.cpSync(sf, tf,{recursive: true} );
    } catch (error: any) {
      console.log(chalk.magenta(error.message));
    }
};

const lastUpdate = (file : string) => {
    const stats = fs.statSync(file);
    const lastModifiedTime = stats.mtime.toISOString();
    return lastModifiedTime;
  };

const clearDirectory = (directoryPath: string, notFirstCall = false) => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        clearDirectory(curPath, true);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    if (notFirstCall) {
      try {
        fs.rmdirSync(directoryPath);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
export {getFiles, isFile, isDir, copy, lastUpdate, clearDirectory}


