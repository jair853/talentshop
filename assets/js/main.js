let productos = [];

fetch("./assets/js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Evento para ocultar la barra de navegación en pantallas pequeñas
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

// Función para cargar los productos en el contenedor
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
// Itera sobre los productos seleccionados y genera el HTML dinámico
     productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

// Evento para manejar el clic en los botones de categoría
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        // Remueve la clase `active` de todos los botones y la agrega al botón seleccionado
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // Filtra los productos según la categoría seleccionada
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id); // Encuentra un producto de la categoría
            tituloPrincipal.innerText = productoCategoria.categoria.nombre; // Cambia el título principal
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id); // Filtra los productos
            cargarProductos(productosBoton); // Carga los productos filtrados
        } else {
            tituloPrincipal.innerText = "Todos los productos"; // Cambia el título a "Todos los productos"
            cargarProductos(productos); // Carga todos los productos
        }
    });
});

// Función para actualizar los eventos de los botones "Agregar"
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar"); // Selecciona todos los botones "Agregar"

    // Agrega un evento de clic a cada botón
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); // Llama a la función `agregarAlCarrito` al hacer clic
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem' 
          },
        onClick: function(){} 
     }).showToast();

     const idBoton = e.currentTarget.id;
     const productoAgregado = productos.find(producto => producto.id === idBoton);
 
     if(productosEnCarrito.some(producto => producto.id === idBoton)) {
         const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
         productosEnCarrito[index].cantidad++;
     } else {
         productoAgregado.cantidad = 1;
         productosEnCarrito.push(productoAgregado);
     }
 
     actualizarNumerito();
 
     localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
 }

 function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}