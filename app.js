import express from "express"
import chatRouter from "./routes/chat.routes.js"
import exphbs from "express-handlebars"
import { Server } from "socket.io"
let app = express ()
const port = 8081

//Datos
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//configurar handlebars
app.engine("handlebars", exphbs.engine())
//renderizar con handlebars
app.set("view engine", "handlebars")
//ubicación de archivos handlebars
app.set("views", "views")
//archiuvos estaticos
app.use(express.static("public"));

//ruta de chat
app.use("/", chatRouter)

//server

const httpServer = app.listen(port, ()=>{
    console.log("http://localhost:8081")
})

//instanciar server
let io = new Server(httpServer)

let mensajes = []
io.on("connection", (socket)=>{
    console.log("Nuevo usuario")

    socket.on("mensaje", data=>{
        mensajes.push(data)

        io.emit("logs", mensajes)
    })
})