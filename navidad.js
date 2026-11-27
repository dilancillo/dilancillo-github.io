const contenedorNieve = document.querySelector(".nieve");

if (contenedorNieve) {
    for (let i = 0; i < 65; i++) {
        const copo = document.createElement("span");

        copo.classList.add("copo");
        copo.textContent = "❄";

        copo.style.left = Math.random() * 100 + "%";
        copo.style.fontSize = (Math.random() * 12 + 8) + "px";
        copo.style.animationDuration = (Math.random() * 8 + 5) + "s";
        copo.style.animationDelay = (Math.random() * 10) + "s";

        contenedorNieve.appendChild(copo);
    }
}


// Contador navideño: se actualiza cada segundo y siempre apunta a la próxima Navidad.
(function crearContadorNavideno() {
    const contador = document.createElement("aside");
    contador.className = "contador-navidad";
    contador.setAttribute("aria-live", "polite");
    contador.innerHTML = '<span class="contador-titulo">🎄 Cuenta regresiva</span><span class="contador-tiempo" id="tiempoNavidad">Cargando...</span><span class="contador-subtitulo">para Navidad</span>';
    document.body.appendChild(contador);

    function actualizarContador() {
        const ahora = new Date();
        let navidad = new Date(ahora.getFullYear(), 11, 25, 0, 0, 0);
        if (ahora >= navidad) navidad = new Date(ahora.getFullYear() + 1, 11, 25, 0, 0, 0);

        const restante = navidad.getTime() - ahora.getTime();
        const dias = Math.floor(restante / 86400000);
        const horas = Math.floor((restante % 86400000) / 3600000);
        const minutos = Math.floor((restante % 3600000) / 60000);
        const segundos = Math.floor((restante % 60000) / 1000);
        const salida = document.getElementById("tiempoNavidad");
        if (salida) salida.textContent = `${dias}d ${String(horas).padStart(2,"0")}h ${String(minutos).padStart(2,"0")}m ${String(segundos).padStart(2,"0")}s`;
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);
})();
