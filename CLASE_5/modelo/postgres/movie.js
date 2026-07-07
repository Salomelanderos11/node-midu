import { required_fun } from "../utils/require_fun.js";
import { randomUUID } from "node:crypto";
import {pool} from '../../conexion/db.js'
const db = pool;
//const movies = required_fun('../movies.json')

export class MovieModel {
    static async getAll  ({genero})  {
        
        if(genero && genero != null){
            const sql = 'select * from peliculas where genero = $1'
            let peliculas = db.query(sql,{genero}) 
            return peliculas
        }

        const sql = 'select * from peliculas'
        let peliculas = db.query(sql) 
        
        return peliculas 
    }


    static async getId  ({id})  {
        const pelicula = movies.find(mov => mov.id == id)
        console.log(id)
        if (pelicula == -1){
            return false
        }
        return pelicula
    }

    static async create ({input}){
        try {

        const new_pelicula = {
            id: randomUUID(),
            ...input  
        }

        movies.push(new_pelicula)
        return new_pelicula   
        } catch (error) {
            return error.message
        }
    }

    static async delete ({id}){
        const index = movies.findIndex(pel => pel.id == id)
        console.log(index,1,id)
        if(index == -1){
            console.log("asd")
            return false
        }
        movies.splice(index,1)
        return true
        
    }
    static async update ({id,input}){
        
        
    const ind = movies.findIndex( mov =>  mov.id == id)

    if(ind == -1){
        return false
    }

    movies[ind]= {
        ...movies[ind],
        ...input
    }
    return movies[ind]
    }
}