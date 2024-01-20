import data from '../../jsb.config.js';
import Header from './header.js';
import Footer from './footer.js';
type MainProps ={
    iconFile: string;
    title: string;
    content: string;
}
export default function MainLayout ({iconFile, title, content}: MainProps){
  
    const html = /* html */ `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="author" content="${data.author}">
            <meta name="description" content="${data.description}">
            <link rel="shortcut icon" href="${iconFile}" type="image/x-icon">
            <link rel="stylesheet" href="https://pub-d94f06e647584b8496cac0d43a6fecfb.r2.dev/js-css/ino.css"> 
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/tokyo-night-dark.min.css">
            <link rel="stylesheet" href="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css"/>
            <title> ${data.sitename} : ${title} </title>
            <style>
                .c{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 20px;
                }
            </style>
        </head>
        <body>
            ${Header()}
            <br>
            <div>${content}</div>
            ${Footer()}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
            <script src="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js"></script>
            <script src="https://cdn.jsdelivr.net/gh/phothinmg/ptm@main/hljsCopyBtn.js"></script>
            <script src="https://cdn.jsdelivr.net/gh/phothinmg/ptm@main/theme.js"></script>
        </body>
    </html>
    `;
    return html
    
}