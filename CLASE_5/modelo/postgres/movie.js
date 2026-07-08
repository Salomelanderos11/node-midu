import { required_fun } from "../../utils/require_fun.js";
import { randomUUID } from "node:crypto";
import {pool} from './conexion_db.js'
const db = pool;
//const movies = required_fun('../movies.json')

export class MovieModel {
    static async getAll  ({genero})  {
        
        if(genero && genero != null){
            const sql = 'select * from peliculas where genero = $1'
            let peliculas = db.query(sql,[genero]) 
            return peliculas
        }

        const sql = 'select * from peliculas'
        let peliculas = db.query(sql) 
        
        return peliculas 
    }


    static async getId  ({id})  {
        const sql= 'select * from movies where id = $1'
        const pelicula = pool.query(sql,[id])

        if (pelicula == -1){
            return false
        }
        return pelicula
    }

    static async create ({input}){
        try {
            
        const new_pelicula =input 
        /*{
            id: randomUUID(),
            ...input  
        }*/

        const colums = Object.keys(new_pelicula)
        const valores = Object.values(new_pelicula)
        const generos = valores[6]
        valores = valores.splice(6) 
        
        console.log(generos)
        const sql ="insert into movies (title,year,director,duration, poster,rate) values ($1,$2,$3,$4,$5,$6,$7)"
        /*const res= await pool.query(sql,valores)
        
        
        if (res.rowCount >0){
                return res.rows 
            }*/    
        return "ocurrio un error al insertar pelicula"   
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