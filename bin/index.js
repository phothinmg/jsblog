#!/usr/bin/env node

import {execSync} from 'child_process';
import { program } from 'commander';
const runCommand = command => {
    try{
        execSync(`${command}`, {stdio: 'inherit'});
    } catch(e){
        console.error(`Fail to excute ${command}`, e);
        return false;
    }
    return true;
}
const devCommand = 'node ./node_modules/jsblog/src/opt/dev/index.js';
const buildCommand = 'npx cross-env NODE_ENV=production node ./node_modules/jsblog/src/opt/build/index.js';
const startCommand = 'node ./node_modules/jsblog/src/opt/start/index.js';
program.version('0.1.2');

program
    .command('dev')
    .description('Development process of app.')
    .action(()=>{
        const checkOut = runCommand(devCommand);
        if(!checkOut) process.exit(-1);
        console.log('Done !!!');
    });

program
    .command('build')
    .description('Build process of app.')
    .action(()=>{
        const checkOut = runCommand(buildCommand);
        if(!checkOut) process.exit(-1);
        console.log('Done !!!');
    });
program
    .command('start')
    .description('Start the app.')
    .action(()=>{
        const checkOut = runCommand(startCommand);
        if(!checkOut) process.exit(-1);
        console.log('Done !!!');
    });

program.parse(process.argv);


