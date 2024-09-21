// Configurar formulario de usuario
Swal.fire({
    title:"Chat comunitario",
    input:"text",
    text:"Ingresa un nombre de usuario para chatear",
    inputValidator: (value) => {
        return !value && "Debe ingresar un usuario";
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
})

let user;
const input = document.getElementById("input");

// Sockets front
let socket = io();

// Configurar eventos
input.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(input.value.trim().length > 0) {
            socket.emit("mensaje", {user: user, mensaje: input.value});
            input.value = ""; // Limpiar el campo después de enviar el mensaje
        }
    }
});

// Escuchar los logs
socket.on("logs", data => {
    const log = document.getElementById("logs");
    let mensajes = "";
    data.forEach(mensaje => {
        mensajes += mensaje.user + ": " + mensaje.mensaje + "<br>";
    });
    log.innerHTML = mensajes;
});
