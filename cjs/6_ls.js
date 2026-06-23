const fs = require('node:fs');

fs.readdir('.',(err,files)=>{
    if(err){
        return console.error("ocurrioe el error :", err);

    }
    files.forEach(file =>{
        console.log(file);
    })
})