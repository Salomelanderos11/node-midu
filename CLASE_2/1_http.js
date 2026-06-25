const http = require('node:http');
const fs = require('node:fs');


const ptdes = process.env.PORT ?? 1234;

const procesarequest= (req,res) => {
    res.setHeader('Content-Type','text/html; charset=utf-8')
    if(req.url === '/'){
        res.statusCode = 200
        console.log(req.url)
        res.end('Bienvenido a mi página de inicio')

    }else if(req.url === '/avion'){
            console.log(req.url)
        res.statusCode = 200
        
        res.end('tumbacasa')

    }
    else if(req.url === '/imagen'){
        fs.readFile('clase_2/imagen_1.png', (err,data)=>{
            if(err){
                res.statusCode= 500
                console.log(err)
                res.end("ocurrioun error");

            }else{
                res.setHeader("Content-Type","image/png")
                res.end(data)
            }
        })

    }
    else{
        console.log(req.url)
        res.statusCode = 404  
        
        res.end('404 pagina No encontrada')
    }
   
}

 

const server = http.createServer(procesarequest)
 
server.listen(ptdes,() =>{
    console.log('escuchndo en el puerto http://localhost:',ptdes)    
})

