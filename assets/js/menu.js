// Selección de elementos del DOM
const openMenu = document.querySelector("#open-menu"); // Botón para abrir el menú lateral
const closeMenu = document.querySelector("#close-menu"); // Botón para cerrar el menú lateral
const aside = document.querySelector("aside"); // Elemento <aside> que representa el menú lateral

// Evento para abrir el menú lateral
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible"); // Agrega la clase `aside-visible` para mostrar el menú lateral
});

// Evento para cerrar el menú lateral
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible"); // Remueve la clase `aside-visible` para ocultar el menú lateral
});
