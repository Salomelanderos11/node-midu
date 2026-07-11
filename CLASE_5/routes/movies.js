import { Router } from "express";
import { MovieController } from "../controlador/movies.js";
import { MovieModel } from "../modelo/postgres/movie.js";

export const createMovieRouter = ({MovieModel}) =>
{   const Rmovies = Router()
    const movieController = new MovieController({MovieModel})
    Rmovies.get('/',movieController.getAll)

    Rmovies.get('/:id',movieController.getid)

    Rmovies.post('/', movieController.create)

    Rmovies.delete('/:id', movieController.delete)

    Rmovies.patch('/:id', movieController.update )
    return Rmovies
}
