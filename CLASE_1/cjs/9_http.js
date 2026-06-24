const http = require('node:http');
const{encontrar_puerto } = require('./10_free_port')
const server = http.createServer((req,res) => {
    console.log('reques recibido')
    res.end('hola  mundo')
})

encontrar_puerto(5432).then(port =>{ 
    server.listen(port,() =>{
        console.log('escuchndo en el puerto http://localhost:',port)
    })
})

