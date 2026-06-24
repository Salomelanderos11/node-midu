const fs = require('node:fs/promises');
const stats = fs.statSync('./asr.txt');
/*console.log(stats.isFile(),
stats.isDirectory(),
stats.isSymbolicLink(),
stats.size
)*/


fs.readFile('./asr.txt','utf-8').then(text => {
    console.log("este el este texto : ",text)
})
console.log('haciendo cosas');
