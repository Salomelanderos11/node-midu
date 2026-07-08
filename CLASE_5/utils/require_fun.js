import { createRequire } from 'module'
const  require = createRequire(import.meta.url)
const lista_peliculas = require('../movies.json')
//console.log(lista_peliculas)
export function required_fun(path) {
    const data = require(path)
    return data
}