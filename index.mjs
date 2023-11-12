// Importă modulele ES
import JSZip from 'jszip';
import fetch from 'node-fetch';
import fs from 'fs/promises';

const listaLinkuri = [
    // lista de link-uri
]

const listaFaraDuplicate = Array.from(new Set(listaLinkuri));

// Funcția pentru crearea arhivei ZIP
async function creeazaZip() {
    const zip = new JSZip();

    const totalElemente = listaFaraDuplicate.length;
    let elementeProcesate = 0;

    for (let i = 0; i < totalElemente; i++) {
        const link = listaFaraDuplicate[i];
        const numeFisier = `fisier_${i + 1}.jpg`;

        const raspuns = await fetch(link);
        const date = await raspuns.arrayBuffer();

        zip.file(numeFisier, date);

        // Actualizare indicator de progres
        elementeProcesate++;
        const progres = (elementeProcesate / totalElemente) * 100;
        console.log(`Progres: ${progres.toFixed(2)}%`);
    }

    const continutZip = await zip.generateAsync({ type: 'nodebuffer' });
    await fs.writeFile('imagini.zip', continutZip);
    console.log('Arhivă creată: imagini.zip');
}

// Apelul funcției pentru crearea arhivei ZIP
creeazaZip();
