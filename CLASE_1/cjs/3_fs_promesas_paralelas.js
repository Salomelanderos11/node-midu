//const fs = require('node:fs/promises');

import { readFile } from 'node:fs/promises';

//ejecutar promesas en paralelo al mismo tiempo

Promise.all([
    readFile('./asr.txt','utf-8'),
    readFile('./asr2.txt','utf-8')
    
]).then(([texto,segundo])=> {
    console.log('primer texto :', texto)
    console.log('segundo texto :', segundo)
});


async function leerEnParalelo() {
    console.log('Iniciando la lectura de ambos archivos al mismo tiempo...');

    // Lanzamos ambas lecturas simultáneamente sin usar 'await' todavía
    const promesa1 = readFile('./asr.txt', 'utf-8');
    const promesa2 = readFile('./asr2.txt', 'utf-8');

    // Esperamos a que ambas promesas se resuelvan juntas
    const [text, segundo] = await Promise.all([promesa1, promesa2]);

    console.log('--- Contenido Archivo 1 ---');
    console.log(text);
    console.log('--- Contenido Archivo 2 ---');
    console.log(segundo);
}
