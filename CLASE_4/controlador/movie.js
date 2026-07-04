import { required_fun } from "../utils/require_fun.js";

const movies = required_fun('../movies.json')

export class MovieModel {
    static getAll ({genero}){
        if(genero && genero != null){
            let peliculas = movies.filter(mov => mov.genre.some(g=> g.toLowerCase()== genero.toLowerCase()))
            return peliculas
        }

        return movies
    }
}