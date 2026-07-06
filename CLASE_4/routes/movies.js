import { Router } from "express";
import { MovieController } from "../controlador/movies.js";



export const Rmovies = Router()

Rmovies.get('/',MovieController.getAll)

Rmovies.get('/:id',MovieController.getid)

Rmovies.post('/', MovieController.create)

Rmovies.delete('/:id', MovieController.delete)

Rmovies.patch('/:id', MovieController.update )

