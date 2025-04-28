// Variables globales
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Función para mostrar/ocultar contenedores
function actualizarVistaCarrito() {
    if (productosEnCarrito.length === 0) {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    } else {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

// Función para cargar productos en el carrito
function cargarProductosCarrito() {
    actualizarVistaCarrito();
    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-talla">
                <small>Talla</small>
                <select class="carrito-producto-talla-select" id="talla-${producto.id}">
                    <option value="S" ${producto.talla === "S" ? "selected" : ""}>S</option>
                    <option value="M" ${producto.talla === "M" ? "selected" : ""}>M</option>
                    <option value="L" ${producto.talla === "L" ? "selected" : ""}>L</option>
                    <option value="XL" ${producto.talla === "XL" ? "selected" : ""}>XL</option>
                </select>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <input type="number" class="carrito-producto-cantidad-input" id="cantidad-${producto.id}" value="${producto.cantidad}" min="1">
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `;

        contenedorCarritoProductos.append(div);
    });

    actualizarBotonesEliminar();
    actualizarTallasProductos();
    actualizarCantidadProductos();
    actualizarTotal();
}

// Función para actualizar las tallas seleccionadas
function actualizarTallasProductos() {
    const selectsTalla = document.querySelectorAll(".carrito-producto-talla-select");

    selectsTalla.forEach(select => {
        select.addEventListener("change", (e) => {
            const idSelect = e.target.id.replace("talla-", "");
            const nuevaTalla = e.target.value;

            const producto = productosEnCarrito.find(producto => producto.id === idSelect);
            producto.talla = nuevaTalla;

            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        });
    });
}

// Función para actualizar las cantidades
function actualizarCantidadProductos() {
    const inputsCantidad = document.querySelectorAll(".carrito-producto-cantidad-input");

    inputsCantidad.forEach(input => {
        input.addEventListener("change", (e) => {
            const idInput = e.target.id.replace("cantidad-", "");
            const nuevaCantidad = parseInt(e.target.value);

            if (nuevaCantidad > 0) {
                const producto = productosEnCarrito.find(producto => producto.id === idInput);
                producto.cantidad = nuevaCantidad;

                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                cargarProductosCarrito();
            } else {
                e.target.value = 1;
            }
        });
    });
}