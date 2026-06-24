const http = require('node:http');


const ptdes = process.env.PORT ?? 1234;

const procesarequest= (req,res) => {
    res.setHeader('Content-Type','text/html; charset=utf-8')
    if(req.url === '/'){
        res.statusCode = 200
        
        res.end('Bienvenido a mi página de inicio')

    }else if(req.url === '/avion'){
            
        res.statusCode = 200
        
        res.end('tumbacasa')

    }
    else{
        
        res.statusCode = 404
        
        res.end('404 pagina No encontrada')
    }
   
}



const server = http.createServer(procesarequest)
 
server.listen(ptdes,() =>{
    console.log('escuchndo en el puerto http://localhost:',ptdes)    
})

