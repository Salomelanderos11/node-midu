import { id } from "zod/v4/locales"
//import { MovieModel } from "../modelo/postgres/movie.js"
import { valid_parcial, validar_peli } from "../schemas/movies.js"
import { parse } from "node:path"

export class MovieController {
    constructor ({MovieModel}){
        this.MovieModel = MovieModel;
    }

    getAll = async (req,res)=> {
        const origin  = req.header('origin')
        
        try {
            const {genero} = req.query

            const movies = await this.MovieModel.getAll({genero})
            res.json(movies)
        }catch (error) {
        res.status(500).json({err:error.message})
        
        }
    }
    
    getid = async (req,res)=>{

        const id = req.params.id

        const pelicula = await this.MovieModel.getId({id})
        if(!pelicula == false) return res.status(200).json({movie: pelicula})
        
        res.status(404).send("PELICULA NO ENCONTRADA")
    
    }
    
    create = async(req, res) =>{
        console.log(5)
        try {
            const peli = req.body  
            const resultado = validar_peli(peli)
            if(resultado.error){
                return res.status(400).json({error: JSON.parse(resultado.error.message)})
            }
                
            const new_peli = await this.MovieModel.create({input : resultado.data})
            
            
            
            res.status(201).json({oks:new_peli})
            
        } 
        catch (error) {
            res.status(500).json({err:error.message, c:2})
        }
    }

    delete = async(req, res) =>{
        try {
            const id = req.params.id
            console.log(id,typeof(id))
            const result = await this.MovieModel.delete({id})
            if(result==false){
               return res.status(404).json({message: "pelicula no encontrada"})
                
            }
        
            res.status(200).json({message : "pelicula eliminada"})
        }catch(error){
            res.status(500).json({err:error})
        }
    }

    update = async(req,res)=> {
        try {
            
            const id =  req.params.id
            const result =  valid_parcial(req.body) 

            if(result.error){
                return res.status(400).json({err: JSON.parse(result.error.message), me:1})
            }

            const updatepeli = await this.MovieModel.update({id:id, input:result.data})
            if(updatepeli == false ){
                return res.status(404).json({message: "pelicula no encontrada"})
            }
            return res.status(203).json(updatepeli)   
        } catch (error) {
            res.status(500).json({err:error.message})
        }
    }
}