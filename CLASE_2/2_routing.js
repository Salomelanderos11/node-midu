const http = require('node:http')
const categories = require('./categorias')
console.log(categories)
const procesar_request = (req, res)=>{

    const {method,url } = req
    console.log(method,url)
    switch (method) {
        
        case 'GET':
           
            switch (url) {
                case '/nort/categorias':
                    
                    res.statusCode=200
                    res.setHeader('Content-Type','application/json; charset=utf-8')
                    
                    res.end(JSON.stringify(categories))
                    break;
                case '/nort/about':
                    
                    res.statusCode=200
                    res.setHeader('Content-Type','text/html charset=utf-8')
                    
                    res.end("<h1>esta es mi nueva api</h1>")
                    break;
            
                default:
                    res.statusCode=404
                    res.setHeader('Content-Type','text/html charset=utf-8')
                    
                    res.end("pagina no encontrada")
                    break;
            }
        case 'POST':
           
            switch (url) {
                case '/nort/categorias':
                    
                    res.statusCode=200
                    res.setHeader('Content-Type','application/json; charset=utf-8')
                    
                    res.end(JSON.stringify(categories))
                    break;
                case '/nort/about':
                    
                    res.statusCode=200
                    res.setHeader('Content-Type','text/html charset=utf-8')
                    
                    res.end("<h1>esta es mi nueva api</h1>")
                    break;
            
                default:
                    res.statusCode=404
                    res.setHeader('Content-Type','text/html charset=utf-8')
                    
                    res.end("pagina no encontrada")
                    break;
            }   
    
        default:
            break;
    }

} 

const server = http.createServer(procesar_request)

server.listen(1234,() =>{
    console.log('escuchndo en el puerto http://localhost:,1234')    
})
