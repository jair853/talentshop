document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-info');
    const titulo = document.getElementById('titulo-principal');

    async function cargarContenido(clave) {
        const res = await fetch('./assets/data/info-sobre-nosotros.json');
        const data = await res.json();
        // contenedor.innerHTML = `<p>${data[clave]}</p>`;
        contenedor.innerHTML = titulo.innerText === "Sobre nosotros" ? `<p>${data['nuestroEquipo']}</p>` 
                          : `<p>${data[clave]}</p>`
        titulo.innerText = clave === 'nuestroEquipo' ? 'Nuestro equipo'
                          : clave === 'mision' ? 'Misión'
                          : 'Visión';
        
    }
    cargarContenido('nuestroEquipo')
    document.getElementById('equipo').addEventListener('click', () => cargarContenido('nuestroEquipo'));
    document.getElementById('mision').addEventListener('click', () => cargarContenido('mision'));
    document.getElementById('vision').addEventListener('click', () => cargarContenido('vision'));
});
