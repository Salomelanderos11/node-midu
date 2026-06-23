const fs = require('node:fs');


const folder = process.argv[2] ?? '.';

fs.readdir(folder,(err,files)=>{
    if(err){
        return console.error("ocurrioe el error :", err);

    }
    files.forEach(file =>{
        console.log(file);
    })
});
