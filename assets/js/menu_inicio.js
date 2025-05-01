fetch("assets/data/sesiones.json") // Llama el archivo con la url de cada sesión
.then(response => response.json())
.then(sesiones => {
    const botonesSesiones = document.querySelectorAll(".boton-sesion");

    botonesSesiones.forEach(boton => {boton.addEventListener("click", (e) => { 

        const sesionActiva = sesiones.find(sesion => sesion.id === boton.id);
        localStorage.setItem("sesion",JSON.stringify(sesionActiva)); // Guarda el id de la sesión en almacenamiento local
        window.location.href = sesionActiva.url; // Carga cada sesión en la página principal
        });
    });

    // Se activa la pestaña de la sesión al cargar la página respectiva
    const nuevaSesion = localStorage.getItem("sesion");
    const sesionIni = JSON.parse(nuevaSesion);
    const cambioSesiones = [...document.querySelectorAll(".boton-sesion")];
    const index = cambioSesiones.findIndex(b => b.id === "inicio");
    cambioSesiones.forEach(btn => {
        if(sesionIni.id === "tienda" && btn.id === sesionIni.id) {
            btn.classList.remove("active"); // Remueve clase active si la sesión almacenada en local es la tienda
            cambioSesiones[index].classList.add("active") // Activa la sesión de inicio
        } else if (btn.id != sesionIni.id) {
            btn.classList.remove("active"); // Remueve la clase active si la sesión es diferente a la almacenada
        } else {
            btn.classList.add("active"); // Activa la sesión seleccionada si es igual a la almacenada
        }
        });
    })
.catch(err => {
    alert("Error al cargar sesiones.json", err);

});