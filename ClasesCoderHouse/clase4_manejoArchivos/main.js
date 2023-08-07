/*
import fs from 'fs'

//sincronica

//Escribir txt
fs.writeFileSync('./ejemplo.txt','Hola mundo soy Nico');

//Consultar si existe txt
console.log(fs.existsSync('./ejemplo.txt'));

if(fs.existsSync('./ejemplo.txt')){
    //leer txt
    let contenido = fs.readFileSync('./ejemplo.txt','utf-8');
    console.log(contenido)

    //Agregar contenido al txt
    fs.appendFileSync('./ejemplo.txt',"\n Hola Nico, soy el mundo");

    //Eliminar txt
    //fs.unlinkSync('./ejemplo.txt');
    fs.writeFileSync('./ejemplo.txt','Hola Alejandro');
}

fs.writeFile('./ejemplo.txt',"Hola Mundo soy Nico",(error)=>{
    if(error)
        return "Error en escritura de archivo"
    fs.readFile('./ejemplo.txt','utf-8',(error,resultado)=>{
        if(error)
            return "Error en la lectura de archivos"
        console.log(resultado)
        fs.appendFile('./ejemplo.txt',"\nAdios",(error)=>{
            if(error)
                return "Error al modificar archivo"
            fs.unlink('./ejemplo.txt',(error)=>{
                if(error)
                    return "Error al eliminar archivo"
            })
        })
    })
})
*/

//import fs from 'fs'
//import {promises} from 'fs
import {promises as fs} from 'fs'

const consultatTxt = async()=>{
    await fs.writeFile('./ejemplo.txt',"Hola Mundo soy Nico")
    let resultado = await fs.readFile('./ejemplo.txt','utf-8')
    console.log(resultado)
    await fs.appendFile('./ejemplo.txt',"\nAdios Nico")
    await fs.unlink('./ejemplo.txt')
}
consultatTxt()