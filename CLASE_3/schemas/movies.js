const zod = require('zod')

const movieschema = zod.object(
    {
        title : zod.string({
            invad_type_eorr : 'el titulo debe seer un string  ',
            required_error: ' el titulo es requerido'
        }),
        year: zod.number({
            required_error: 'el eño es requerido'
        }).int().min(1950).max(2026),
        director: zod.string({
            invad_type_eorr : 'el director debe seer un string  ',
            required_error: ' el director es requerido'
        }),
        duration: zod.number({
            invalid_type_error : 'debe ser un numero entero'
        }).int().positive(),
        poster: zod.url({
            message:'debe ser una url valida'}
        ),
        genre: zod.array(zod.enum([
                        "Action",
                        "Adventure",
                        "Biography",
                        "Crime",
                        "Drama",
                        "History",
                        "Mystery",
                        "Romance",
                        "Sci-Fi",
                        "Thriller",
                        "Terror"
                        ])), 
        rate : zod.number().min(0).max(10).default(0)
    }
)



function validar_peli(object){
    return movieschema.safeParse(object)
}


function valid_parcial(object){
    return movieschema.partial().safeParse(object)
}

module.exports = {validar_peli, valid_parcial}