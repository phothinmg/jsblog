import polka from 'polka';
import compression from 'compression';
import sirv from 'sirv';
import chalk from 'chalk';

type props ={
  link: string;
  dir: string
}
export default function server(routes: props []) {
    const port = 5040 || 3330;
    const app = polka();
    
    app.use(compression());
  
    app.use((req, res, next) => {
      if (req.url.endsWith('?%20[sm]')) {
        res.writeHead(302, {
          Location: req.url.replace('?%20[sm]', '.map')
        });
        res.end();
        return;
      }
  
      if (req.url.endsWith('/')) {
        req.url += 'index.html';
      } else {
        req.url = req.url.replace(/\.html$/, '');
      }
  
      next();
    });
    // app.use('/posts/index.html', sirv('/posts'));
    for (const item of routes) {
      app.use(item.link, sirv(item.dir));
    }
  
    app.listen(port, () => {
      console.log(chalk.greenBright.italic(`Server is running at http://localhost:${port}`));
    });
    
  };
  

