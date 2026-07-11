import express, { json } from 'express'
import { corsmiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'
//import { MovieModel } from './modelo/postgres/movie.js'


export const createApp = ({MovieModel}) =>{

    const app = express()
    app.disable('x-powered-by')
    const port = process.env.PORT ?? 1234
    app.use(corsmiddleware())
    app.use(express.json())



    //asignar routers
    app.use('/movies',createMovieRouter({MovieModel}))





    app.get('/',(req,res)=>{
        res.json({mensaje: "holamundo"})
    })
    

    app.use((req, res)=>{
        res.status(404).send("<h1> 404 PAGINA NO ENCONTRADA</h1>")

    })
    
    app.listen(port,()=>{
        console.log(`app escuchando desde localhost:${port}`)
    })

    return app

}