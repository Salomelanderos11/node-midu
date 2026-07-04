import { Router } from "express";
import { randomUUID } from 'crypto';
import { required_fun } from "../utils/require_fun.js";
import { validar_peli, valid_parcial } from '../schemas/movies.js' 
import { MovieModel } from "../controlador/movie.js";
export const Rmovies = Router()
const require = required_fun
const lista_peliculas = require('../movies.json')

Rmovies.get('/',(req,res)=>{
    const origin  = req.header('origin')
    
    try {
        const {genero} = req.query
        const movies = MovieModel.getAll({genero})
        res.status(200).json(movies)
        
    } catch (error) {
        res.status(500).json({err:error})
        
    }
    
})

Rmovies.get('/:id',(req,res)=>{
    const id_pel = req.params.id
    const pelicula = lista_peliculas.find(mov => mov.id == id_pel )
    if(pelicula) return res.status(200).json({movies : pelicula})
    
    res.status(404).send("PELICULA NO ENCONTRADA")

})

Rmovies.post('/',(req, res)=>{
    
    const {title,year,director,duration,poster,genre,rate} = req.body
    const resultado = validar_peli(req.body)
    if(resultado.error){
    return res.status(400).json({error: JSON.parse(resultado.error.message)})
    }

    const pelicula = {
        id: randomUUID(),
        ...resultado.data    
    }

    console.log(pelicula)
    lista_peliculas.push(pelicula)
    res.status(400).json(pelicula)
})

Rmovies.delete('/:id',(req, res)=>{
    const id = req.params.id
    const index = lista_peliculas.find(pel => pel.id == id)
    if(index == -1){
        res.status(404).json({message: "pelicula no encontrada"})
    }

    lista_peliculas.splice(index,1)
    res.status(204).json({message : "pelicula eliminada"})
})

Rmovies.patch('/:id',(req,res)=>{

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

