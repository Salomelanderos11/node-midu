import { MovieModel } from "../modelo/local-file/movie.js";
import { createApp } from "../server.js";

const app = createApp({MovieModel:MovieModel})