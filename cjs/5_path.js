const path = require('node:path');
//barra separados sefun el so
console.log(path.sep);


const filepath = path.join('avec', 'cesad', 'marane','alesa');
console.log(filepath);

const base = path.basename('C:/Users/MX90265532/node-midu/cjs/5_path.js')
console.log(base);

const  nombre = path.basename('C:/Users/MX90265532/node-midu/cjs/5_path.js','.js');
console.log(nombre);


const extension = path.extname('Mi.super.imagen.as.jpg');
console.log(extension);
