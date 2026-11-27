// Envío y consulta de cartas mediante PHP + MySQL.
const formulario = document.getElementById("formulario");

if (formulario) {
    formulario.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const edad = document.getElementById("edad").value;
        const mensaje = document.getElementById("mensaje").value.trim();
        const resultado = document.getElementById("resultado");
        const boton = formulario.querySelector('button[type="submit"]');

        if (!nombre || !edad || !mensaje) {
            resultado.textContent = "Completa todos los campos.";
            return;
        }

        boton.disabled = true;
        boton.textContent = "Enviando carta...";

        try {
            const respuesta = await fetch("api/guardar_carta.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, edad, mensaje })
            });
            const datos = await respuesta.json();

            if (!respuesta.ok || !datos.ok) {
                throw new Error(datos.mensaje || "No se pudo guardar la carta.");
            }

            resultado.textContent = datos.mensaje;
            formulario.reset();
        } catch (error) {
            resultado.textContent = error.message || "Ocurrió un error al conectar con el servidor.";
        } finally {
            boton.disabled = false;
            boton.textContent = "🎅 Enviar carta";
        }
    });
}

const botonConsulta = document.getElementById("consultar");

if (botonConsulta) {
    botonConsulta.addEventListener("click", async function() {
        const datos = document.getElementById("datos");
        const aviso = document.getElementById("aviso");
        botonConsulta.disabled = true;
        botonConsulta.textContent = "Consultando buzón...";

        try {
            const respuesta = await fetch("api/consultar_cartas.php", { cache: "no-store" });
            const resultado = await respuesta.json();

            if (!respuesta.ok || !resultado.ok) {
                throw new Error(resultado.mensaje || "No se pudieron consultar las cartas.");
            }

            if (resultado.hayCarta) {
                const carta = resultado.carta;
                document.getElementById("nombreGuardado").textContent = carta.nombre;
                document.getElementById("edadGuardada").textContent = carta.edad + " años";
                document.getElementById("mensajeGuardado").textContent = carta.mensaje;
                datos.hidden = false;
                aviso.textContent = "¡Encontramos la carta más reciente! 🎁";
                aviso.style.color = "#24583d";
            } else {
                datos.hidden = true;
                aviso.textContent = "Todavía no hay ninguna carta guardada. ¡Sé el primero en escribirle a Santa! 🎅";
                aviso.style.color = "#a12626";
            }
        } catch (error) {
            datos.hidden = true;
            aviso.textContent = error.message || "No se pudo conectar con el servidor.";
            aviso.style.color = "#a12626";
        } finally {
            botonConsulta.disabled = false;
            botonConsulta.textContent = "🎄 Consultar carta";
        }
    });
}
