const fs = require('node:fs');
const stats = fs.statSync('./asr.txt');
/*console.log(stats.isFile(),
stats.isDirectory(),
stats.isSymbolicLink(),
stats.size
)*/


fs.readFile('./asr.txt','utf-8', (error,text)=>{
    console.log('el texto es :', text)
});
console.log('haciendo cosas');
