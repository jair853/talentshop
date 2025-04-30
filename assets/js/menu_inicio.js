fetch("assets/data/sesiones.json") // Llama el archivo con la url de cada sesión
.then(response => response.json())
.then(sesiones => {
    const botonesSesiones = document.querySelectorAll(".boton-sesion");
    const botonContacto = document.getElementById("contacto");
    const titulo = document.getElementById("titulo-principal")
    sesiones.forEach(sesion => {
        botonesSesiones.forEach(boton => boton.addEventListener("click", (e) => { 
            e.preventDefault();
            boton.classList.remove("active"); // Inactiva todas las sesiones
            e.currentTarget.classList.add("active"); // Activa la sesión seleccionada
            const sesionActiva = sesiones.find(sesion => sesion.id === e.currentTarget.id);
            window.location.href = sesionActiva.url; // Carga cada sesión en la página principal
        }));
    });
    if(titulo.innerText === "Contacto") {
        botonesSesiones.forEach(boton => {
            boton.classList.remove("active");
        });
        botonContacto.classList.add("active");    
    }
})
.catch(err => {
    alert("Error al cargar sesiones.json", err);

});