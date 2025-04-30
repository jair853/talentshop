const messages = [
    { text: "Super Promoción", color: "#ff6b6b" },
    { text: "Hasta 80% de descuento en tu segunda prenda", color: "#010fb7" },
    { text: "Visita nuestra tienda", color: "#6b83ff" }
  ];
  
  let index = 0;
  const messageText = document.getElementById('message-text');
  const arrow = document.getElementById('arrow');
  const messageContainer = document.getElementById('js-message');
  
  function showNextMessage() {
    const msg = messages[index];
    messageText.textContent = msg.text;
    messageContainer.parentElement.style.backgroundColor = msg.color;
  
    // Efecto diapositiva y rebote
    messageContainer.style.transform = "scale(1.05)";
    setTimeout(() => messageContainer.style.transform = "scale(1)", 200);

    // Mostrar / ocultar la flecha
    if(msg.text === "Visita nuestra tienda") {
      arrow.classList.remove('hidden');
    } else {
      arrow.classList.add('hidden');
    }
  
    index = (index + 1) % messages.length;
  }
  
  showNextMessage(); // Muestra el primer mensaje
  setInterval(showNextMessage, 3000); // Cambia de mensaje cada 3 segundos