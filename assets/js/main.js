// Función para cargar los productos en el contenedor
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos productos

    // Itera sobre los productos seleccionados y genera el HTML dinámico
    productosElegidos.forEach(producto => {
        const div = document.createElement("div"); // Crea un contenedor para cada producto
        div.classList.add("producto"); // Agrega la clase `producto` al contenedor
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div); // Agrega el producto al contenedor principal
    });

    actualizarBotonesAgregar(); // Actualiza los eventos de los botones "Agregar"
}

