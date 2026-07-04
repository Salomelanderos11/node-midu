import cors from 'cors';
const ORIGENES_ACEPTADOS = ['http://localhost:1234','http://localhost:8080','http://localhost:5500']

export const corsmiddleware = ({originsacepted = ORIGENES_ACEPTADOS} = {}) => cors({
    origin : (origin,callback) =>{
        
        if(originsacepted.includes(origin) || !origin){
            return callback(null,true)
        }
        
        return callback(new Error("NO PERMITIDO POR CORS"))

    }
})