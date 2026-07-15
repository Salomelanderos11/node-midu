import express from 'express'
import logger from 'morgan'
import {Server } from 'socket.io'
import {createServer } from 'node:http'
import { disconnect } from 'node:cluster'

const port = process.env.PORT ?? 1234

const app = express()
const server = createServer(app)
const io = new Server(server)
io.on('connection',(socket)=>{
    console.log('user con conexion')
    socket.on('disconnect',()=>{
        console.log('usuario desconectado')
    })
})

app.use(logger('dev'))
app.get('/',(req,res)=> {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port,()=>{
    console.log(`server running in por ${port} `)
})


