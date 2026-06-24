//const fs = require('node:fs/promises');

import { readFile } from 'node:fs/promises';

//ejecucion asyncrona secuencial, la funcion es asyncrona pero el orden de ejecucion pero no se ejecuta el segundo readfile hata que temina el primero.
async function aver(){
    console.log('leer primero');
    const text = await readFile('./asr.txt', 'utf-8');
    console.log(text);
    console.log('leer segundo.');
    const segundo  = await readFile('asr2.txt','utf-8');
    console.log(segundo);



};

aver();