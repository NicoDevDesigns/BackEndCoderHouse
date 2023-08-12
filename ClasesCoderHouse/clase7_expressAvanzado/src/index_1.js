import express from 'express'
import {promises as fs} from 'fs' //Trabajar con promesas

const app = express()
const PORT = 4000
const PATH = "./src/users.json"

class User {
    constructor(nombre,apellido,email,password){
        this.nombre=nombre
        this.apellido=apellido
        this.email=email
        this.password=password
        this.id=User.incrementarId()
    }
    static incrementarId(){
        if(this.idIncrement){
            this.idIncrement++
        }else {
            this.idIncrement = 1;
        }
        return this.idIncrement;
    }
}

//consulta complejas con queries
app.use(express.urlencoded({extended: true}))
app.use(express.json())//Permite trabajar con formato JSON

app.get('/',(req,res)=>{
    res.send("Pagina inicial")
})

app.post('/users',async(req,res)=>{
    //console.log(req.body)
    const { nombre, apellido, email, password } = req.body 

    const users = JSON.parse(await fs.readFile(PATH,'utf-8'))
    const user = users.find(usuario => usuario.email === email)

    if(user){
        res.status(400).send("Usuario creado")
    }
    const userClass = new User(nombre,apellido,email,password)
    users.push(userClass)
    await fs.writeFile(PATH,JSON.stringify(users))
    res.status(200).send(`Usuario ${nombre} creado`)
    
})

app.put('/users',async(req,res)=>{
    const {id} = req.params
    const { nombre, apellido, email, password } = req.body 

    const users = JSON.parse(await fs.readFile(PATH,'utf-8'))
    const user = users.find(usuario => usuario.email === email)

    if(user){
        res.status(400).send("Usuario creado")
    }
    users.push({nombre, apellido, email, password})
    await fs.writeFile(PATH,JSON.stringify(users))
    res.status(200).send(`Usuario ${nombre} creado`)
    
})

app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})