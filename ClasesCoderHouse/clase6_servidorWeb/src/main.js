/*
import * as http from 'http'
//Se instala nodemon como dependencia de desarrollo
//npm run dev
//"dev": "node main.js"
//"dev": "nodemon main.js"

const PORT = 4000
//req = request y res = response
const server = http.createServer((req,res)=>{
    res.end("Hola, buenas tardes")
})

//Arrancar mi servidor
server.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})
*/
import express from 'express'

//app va a poder ejectutar todos los metodos de express
const app = express()

const PORT = 4000
//Poder ejecutar queries complejas
app.use(express.urlencoded({extended:true}))

const productos = [
    {
        nombre: "Nicolas",
        id: 1,
        categoria: "Hombre"
    },
    {
        nombre: "Torta",
        id: 2,
        categoria: "Pasteleria"
    },
    {
        nombre: "Pizza",
        id: 3,
        categoria: "Cocina"
    },
    {
        nombre: "Pollo",
        id: 4,
        categoria: "Cocina"
    }
]


app.get('/',(req,res)=>{
    res.send("Hola desde la pagina de inicio de mi app")
})
//res.send() actua como un return implicito
app.get('/productos/:id',(req,res)=>{

    const prod = productos.find(prod=>prod.id===parseInt(req.params.id))

    //console.log(req.params.id)
    if(prod)
        res.send(prod)
    res.send("Producto no encontrado")
})
app.get('/productos',(req,res)=>{
    //console.log(req.query)
    const { categoria } = req.query
    //console.log(categoria)
    const prods = productos.filter(prod => prod.categoria ===  categoria)
    //res.send("Productos")
    res.send(prods)
})

// Ruta 404 es la ultima  que se define
app.get('*',(req,res)=>{
    res.send("Error 404")
})
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})