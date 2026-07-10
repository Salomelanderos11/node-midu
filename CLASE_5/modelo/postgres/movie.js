import { required_fun } from "../../utils/require_fun.js";
import { randomUUID } from "node:crypto";
import {pool} from './conexion_db.js'
import { object } from "zod";
const db = pool;
//const movies = required_fun('../movies.json')

export class MovieModel {
    static async getAll  ({genero})  {
        try{
        if(genero && genero != null){
            const sql = `SELECT 
                            m.id, m.title, m.year,jsonb_agg(g.name) AS genres, m.director, m.duration, m.poster, m.rate,
                            
                        FROM movies m
                        INNER JOIN movie_genero mg ON mg.id_movie = m.id
                        INNER JOIN generos g ON g.id = mg.genero_id
                        GROUP BY m.id
                        HAVING $1 = ANY(array_agg(g.name));`
            const res= await db.query(sql,[genero]) 
            return res.rows
        }

        const sql = `SELECT 
                            m.id, 
                            m.title, 
                            m.year, 
                            m.director
                            ,
                            -- Agrupa todos los nombres de los géneros en un array JSON nativo: ["Drama", "Action"]
                            jsonb_agg(g.name) AS genres,  
                            m.duration, 
                            m.poster, 
                            m.rate
                        FROM movies m
                        LEFT JOIN movie_genero mg ON mg.id_movie = m.id
                        LEFT JOIN generos g ON g.id = mg.genero_id
                        GROUP BY m.id;`
        let res = await db.query(sql) 
        
        return res.rows
    }catch (error) {
           console.error("❌ Error detectado en la ejecución del SP:", error.message);
            throw new Error(`Error al insertar película: ${error.message}`);
        }
    }


    static async getId  ({id})  {
        const sql= `SELECT 
                            m.id, 
                            m.title, 
                            m.year, 
                            m.director,
                            -- Agrupa todos los nombres de los géneros en un array JSON nativo: ["Drama", "Action"]
                            jsonb_agg(g.name) AS genres,  
                            m.duration, 
                            m.poster, 
                            m.rate
                        FROM movies m
                        LEFT JOIN movie_genero mg ON mg.id_movie = m.id
                        LEFT JOIN generos g ON g.id = mg.genero_id
                        where m.id = $1
                        GROUP BY m.id;`
        const res = await pool.query(sql,[id])

        if (res.rowCount > 0){
            return res.rows
        }
        return 'Pelicula no encontrada'
    }

    static async create ({input}){
        try {
         
        const sql ="call PROCESAR_PELI($1,$2)"
        
        const res= await pool.query(sql,[input,null])
        const ID = res.rows[0]? res.rows[0].m_id : null;
        
        if (ID != null){
                return ID
            }
        return "No se pudo obtenener el id de la pelicula"   
        } catch (error) {
           console.error("❌ Error detectado en la ejecución del SP:", error.message);
            
            // Puedes inspeccionar propiedades específicas que te envía Postgres:
            // console.log(error.code); // Código de error de Postgres (ej. '23505' para clave duplicada)
            // console.log(error.detail); // Detalle del fallo entregado por la BD
            
            // En lugar de un string, la buena práctica es lanzar el error o retornar false/null
            throw new Error(`Error al insertar película: ${error.message}`);
        }
    }

    static async delete ({id}){

        const sql = 'delete from movies where id = $1'
        const res = await pool.query(sql,[id])
        
        if(res.rowCount > 0){
            return true
        }
        return false
        
    }
    static async update ({id,input}){
        try {
            
            const columns = Object.keys(input)
            const valores = Object.values(input)
            const updates = columns.map((key,ind) =>{
                const query = `${key} = $${ind+1}`
                return query
                }).join(',')
            
            valores.push(id)
            const sql = `update movies set ${updates} where id = $${valores.length}`
            const res = await pool.query(sql,valores)
            if(res.rowCount >0){
                return true
            }

            return false
        } catch (error) {
            console.error('Ocurrio un eerror de ejecucion : ',error.message)
            return error
        }
        
    }
}