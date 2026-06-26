const express = require('express');
const cors = require('cors'); // 1. Requerir el paquete

const app = express();

app.use(cors()); // 2. Habilitar para todas las rutas y todos los orígenes 🔓
app.use(express.json());
app.disable('x-powered-by')
const port = process.env.PORT ?? 1234;

app.use((req,res,next)=>{
    console.log('mi middleware')
    next()
})

app.get('/nort/categorias',(req,res)=>{
    res.status(200).send("habia una vez")
})
app.post('/nort/categorias', (req, res) =>{
    const requ = req.body
    console.log(requ)
    res.status(200).json({res:"oks"})
})
app.use((req, res)=>{
    res.status(404).send("<h1>404 not found <h1/>")
})
app.listen(port,()=>{
    console.log("servidor escuchando  en el puesto 1234 : http://localhost:1234")
})



   
