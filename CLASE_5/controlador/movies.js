import { id } from "zod/v4/locales"
import { MovieModel } from "../modelo/local-file/movie.js"
import { valid_parcial, validar_peli } from "../schemas/movies.js"

export class MovieController {
    static async getAll (req,res) {
        const origin  = req.header('origin')
        
        try {
            const {genero} = req.query
            const movies = await MovieModel.getAll({genero})
            res.json(movies)
        }catch (error) {
        res.status(500).json({err:error})
        
        }
    }
    
    static async getid (req,res){

        const id = req.params.id

        const pelicula = await MovieModel.getId({id})
        if(!pelicula == false) return res.status(200).json({movie: pelicula})
        
        res.status(404).send("PELICULA NO ENCONTRADA")
    
    }
    
    static async create (req, res){
        try {
        //const {title,year,director,duration,poster,genre,rate} = req.body
            const resultado = validar_peli(req.body)
            
            if(resultado.error){
                return res.status(400).json({error: JSON.parse(resultado.error.message),c:1})
            }

            const new_peli = await MovieModel.create({input : resultado.data})
            
            res.status(201).json(new_peli)
            
        } 
        catch (error) {
            res.status(500).json({err:error, c:2})
        }
    }

    static async delete (req, res) {
        try {
            const id = parseInt( req.params.id,10)
            console.log(id,typeof(id))
            const result = await MovieModel.delete({id})
            if(result==false){
               return res.status(404).json({message: "pelicula no encontrada"})
                
            }
        
            res.status(200).json({message : "pelicula eliminada"})
        }catch(error){
            res.status(500).json({err:error})
        }
    }

    static async update (req,res) {
        try {
            
            const id = req.params.id
            const result =  valid_parcial(req.body) 

            if(result.error){
                return res.status(400).json({err: JSON.parse(result.error.message), me:1})
            }

            const updatepeli = await MovieModel.update({id:id, input:result.data})
            if(updatepeli == false ){
                res.status(404).json({message: "pelicula no encontrada"})
            }
            return res.status(203).json(updatepeli)   
        } catch (error) {
            res.status(500).json({err:error})
        }
    }
}