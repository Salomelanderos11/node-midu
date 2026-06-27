const express = require('express')
const app = express()

const lista_peliculas = require('./movies.json');
app.disable('x-powered-by')
const port = process.env.PORT ?? 1234

app.get('/',(req,res)=>{
    res.json({mensaje: "holamundo"})
})
 
app.get('/peliculas',(req,res)=>{

    try {
        const {genero} = req.query
        if(genero && genero != null){
            let peliculas = lista_peliculas.filter(mov => mov.genre.some(g=> g.toLowerCase()== genero.toLowerCase()))
            return res.status(200).json({movies: peliculas})
        }
        else{
            res.status(200).json(lista_peliculas)
        }
    } catch (error) {
        res.status(500).json({err:error})
        
    }
    
})

app.get('/peliculas/:id',(req,res)=>{
    const id_pel = req.params.id
//console.log(id_pel)
    const pelicula = lista_peliculas.find(mov => mov.id == id_pel )
    if(pelicula) return res.status(200).json({movies : pelicula})
    
    res.status(404).send("PELICULA NO ENCONTRADA")

})

app.listen(port,()=>{
    console.log(`app escuchamdo desde localhost:${port}`)
})