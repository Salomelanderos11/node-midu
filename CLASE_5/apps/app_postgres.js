import { MovieModel } from "../modelo/postgres/movie.js";
import { createApp } from "../server.js";


const app = createApp({MovieModel:MovieModel});
