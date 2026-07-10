import z from 'zod'

const movieschema = z.object(
    {
        title : z.string({
            invad_type_eorr : 'el titulo debe seer un string  ',
            required_error: ' el titulo es requerido'
        }),
        year: z.number({
            required_error: 'el eño es requerido'
        }).int().min(1950).max(2026),
        director: z.string({
            invad_type_eorr : 'el director debe seer un string  ',
            required_error: ' el director es requerido'
        }),
        duration: z.number({
            invalid_type_error : 'debe ser un numero entero'
        }).int().positive(),
        poster: z.url({
            message:'debe ser una url valida'}
        ),
        genre: z.array(z.enum([
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
        rate : z.number().min(0).max(10).optional()
    }
)



export function validar_peli(object){
    const createSchema = movieschema.extend({
        rate: z.number().min(0).max(10).default(0) // 👈 El default solo aplica al crear
    });
    return createSchema.safeParse(input);
}


export function valid_parcial(object){
    return movieschema.partial().safeParse(object)
}

export default {validar_peli, valid_parcial}