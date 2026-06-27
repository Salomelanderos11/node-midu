const express = require('express')
const crypto = require('crypto')
const { validar_peli, valid_parcial }= require('./schemas/movies') 
const app = express()

const lista_peliculas = require('./movies.json');
app.disable('x-powered-by')
const port = process.env.PORT ?? 1234
const ORIGENES_ACEPTADOS = ['http://localhost:1234','http://localhost:8080','http://localhost:5500']



app.use(express.json())


app.get('/',(req,res)=>{
    res.json({mensaje: "holamundo"})
})
 
app.get('/peliculas',(req,res)=>{
    const origin  = req.header('origin')
    if(ORIGENES_ACEPTADOS.includes(origin) || !origin){
        res.header('Access-Control-Allow-Origin', origin)
    }

    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')

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

app.post('/peliculas',(req, res)=>{
    
    const {title,year,director,duration,poster,genre,rate} = req.body
    const resultado = validar_peli(req.body)
    if(resultado.error){
    return res.status(400).json({error: JSON.parse(resultado.error.message)})
    }

    const pelicula = {
        id: crypto.randomUUID(),
        ...resultado.data    
    }

    console.log(pelicula)
    lista_peliculas.push(pelicula)
    res.status(400).json(pelicula)
})

app.patch('/peliculas/:id',(req,res)=>{

    const id = req.params.id
    const result =  valid_parcial(req.body) 
    console.log(req.body)
    if(result.error){
        return res.status(400).json({err: JSON.parse(result.error.message), me:1})
    }

    const ind = lista_peliculas.findIndex( mov =>  mov.id == id)

    if(ind == -1){
        return res.status(404).json({message: "no encontrada"})
    }
    const updatepeli = {
        ...lista_peliculas[ind],
        ...result.data
    }
    return res.status(203).json(updatepeli)
})

app.use((req, res)=>{
    res.status(404).send("<h1> 404 PAGINA NO ENCONTRADA</h1>")

})

app.listen(port,()=>{
    console.log(`app escuchando desde localhost:${port}`)
})