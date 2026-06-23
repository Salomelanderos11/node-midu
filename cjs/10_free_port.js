const net  = require('node:net');
const { promiseHooks } = require('node:v8');

 function encontrar_puerto(puertodeseable){
    return new Promise((res, reject) => {
        const server = net.createServer()

        server.listen(puertodeseable,()=> {
            const {port } = server.address()
            server.close(()=> {
                 res(port)

            })

        server.on('error',(err)=>{
            if(err.code === 'EADDRINUSE'){
                encontrar_puerto(0).then(port => res(port))
            }else{
                reject(err)
            }
        })

        })
    })
}

module.exports= {encontrar_puerto}