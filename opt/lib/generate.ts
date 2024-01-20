import path from 'path';
import Converter from "ptm-converter";
import { writeFile } from "write-file-safe";
import globParent from "glob-parent";
import {getFiles, isFile, isDir, copy, lastUpdate} from './filesUtil.js';
import chalk from 'chalk';
import MainLayout from '../components/layout.js';
let routs: any[] = [];
function generator(outDir: string, appDir: string){
  console.log(chalk.green.italic('Start dev .... '));
  const start = Date.now();
  const root = process.cwd();
  const workDir = path.join(root, appDir);
  const rl = root.split('/').length + 1 ;
  const mdFiles = getFiles({
    outDir: outDir,
    dir: appDir,
    ext: 'md'
  });
  const out = path.join(root, outDir);
  copy(`${workDir}/favicon.ico`, `${out}/favicon.ico`);
  copy(`${workDir}/images`, `${out}/images`);
  let bps: any [] = [];
  if(mdFiles === undefined){chalk.bgGrey.magenta('Please Check Your App Directory')}else{
    mdFiles.forEach((mdfp) => {
      const filesContent = new Converter(mdfp);
      const fn = mdfp.split('/').slice(-1)[0].split('.')[0];// file name
      const fname = `${fn}.html`;// file name with ext
      const ctt = filesContent.data.type;
      const title = filesContent.postTitle;
      const pageHtml = filesContent.pageHtml;
      const postHtml = filesContent.postHtml;
      const fld = globParent(mdfp).split('/').slice(rl);
      const rdir = path.join(out, fld.join('/'));
      // const mdFileUpdate = formatDate(lastUpdate(mdfp));// latest update
      let targetDir = "";
      const csspat = '../'
      let pat = "";
      let cssp = "";
      if(fld.length === 0){
        pat = '/'
        cssp = './'
      } else {
        for(let i = 0; i<fld.length; i++){
          pat += `/${fld[i]}`
          cssp += `${csspat}`
        }
      }
      if(fld.length === 0){
         targetDir = path.join(out, fname)
      } else {
         targetDir = path.join(out, pat, fname)
      }
      let rout;
      if(fn == 'index'){
        rout = pat
      } else {
        rout = `${pat}/${fname}`
      }
      const rou = {link: rout, dir: rdir}
      routs.push(rou);// router
      const iconFile = `${cssp}favicon.ico`;
      const cssFile = `${cssp}index.css`
      let content;
      // let lastUp;
      let bptt;
      let blogPosts;// *** thing to do
      if(ctt == 'page'){
        content = pageHtml
        // lastUp = ''
        bptt = ''
      } else if (ctt == 'post'){
        content = postHtml
        // lastUp = `last update :  ${mdFileUpdate}`
        bptt = `${pat}/${fname}`
      } else {
        console.warn(chalk.magentaBright.italic('Please check "type" in markdown file , type is only page or post and it is required.'));
        return;
      }
      if(ctt == 'post'){
        blogPosts = `

        <tr>
          <td><a href=${bptt} class="col-3" style="text-decoration: none;text-align: center;">${title}</a></td>
          <td><small>${filesContent.postDate}</small></td>
        </tr>
       
      `
  }
      bps.push(blogPosts);
      const html = MainLayout({
        title: title,
        iconFile: iconFile,
        content: content
      });
      writeFile(targetDir, html);
    });
    const bpc = bps.filter(item => item !== undefined);
    const posthtml = `
      <h3>All Posts</h3>
      <br>
      <table>
      <tr>
          <th>Post</th>
          <th>Date</th>
      </tr>
        ${bpc.map((item) => (
          `${item}`
        )).join('')}
      </table>
    `;
    const bp = path.join(out,'posts/index.html');// *** thing to do
    // const blogHtml = IndexLayout('Blog Posts', posthtml,'../favicon.ico', '');// *** thing to do
    const blogHtml = MainLayout({
      title: 'Blog Posts',
      iconFile:'../favicon.ico',
      content: posthtml
    })
    writeFile(bp, blogHtml);// *** thing to do
    const end = Date.now();
    console.log(chalk.green(`Done in ${end - start} ms.`))
  };
  
};
  function router() {
  const uniqueLinks = new Set(routs.map(item => item.link));
  const routes = Array.from(uniqueLinks).map(link =>
    routs.find(item => item.link === link)
  );
  return routes;
}

export {generator, router}

