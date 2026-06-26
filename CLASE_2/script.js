async function enviarCategoria() {
    // 1. Esperamos a que la petición termine en la red
    const response = await fetch('http://localhost:1234/nort/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: "tienda", descripcion: "lo que caiga" })
    });

    // 2. Esperamos a que se procese el JSON de respuesta
    const datos = await response.json();
    return datos
   // console.log(datos); // ➔ Imprimirá directamente: { res: "oks" }
}


async function imprimir(params) {
    
const a = await enviarCategoria()    
console.log(a)
}

imprimir()