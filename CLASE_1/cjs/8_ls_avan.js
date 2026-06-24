const fs = require('node:fs/promises');
const path = require('node:path');
const pic = require('picocolors')

//const folder = process.argv[2] ?? '.';


async function ls(folder='.') {

    let files;
    try {
        files = await fs.readdir(folder);
    } catch  {
        console.log('no se pudo leee el directorio : ',folder);
        process.exit(1);        
    }
    const filepromesis = files.map(async file => {

        const filepath = path.join(folder,file);
        let  filestat 
        try {
            filestat = await fs.stat(filepath);
        } catch  {
            console.log('No se pudo leer el stat del archivo :', filepath)
            process.exit(1);
        }

        const esdirectorio = filestat.isDirectory();
        const filetype = esdirectorio ? "d": 'F';
        const tamaño = filestat.size.toString();
        const lastmod = filestat.mtime.toLocaleString();

        return (filetype+"  "+file+"  "+ tamaño+"  "+lastmod+"  ")

    });

    let filesinfo = await Promise.all(filepromesis);

    filesinfo.forEach(fileinfo => {
        console.log(fileinfo);
    });



}

ls('../mjss')




