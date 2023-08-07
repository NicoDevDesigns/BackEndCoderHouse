/*
Proceso de encriptacion

1) Algoritmo de encriptacion
2) Key o clave
3) Iv o vector inicial


import  * as crypto from 'crypto'

//Consultar los tipos de algoritmos de encriptacion
//console.log(crypto.getCiphers())

const algoritmo = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

//console.log(key)
//console.log(iv)

const encriptar = (password)=>{
    //Poder consultar el bufer
    //Crear objeto para encriptar
    const cipher = crypto.createCipheriv(algoritmo,Buffer.from(key),iv)
    cipher.update(password)//preparo el objeto para encriptar
    let passwordEncriptado = cipher.final()//resultado de la encriptacion
    console.log("******Encriptar*******")
    //console.log(passwordEncriptado.toString('hex'))
   
    return passwordEncriptado
}
//encriptar('Nico')

const hackerman = (passwordEncriptado)=>{
    const decipher = crypto.createDecipheriv(algoritmo,Buffer.from(key),Buffer.from(iv,'hex'))//(algoritmo,Buffer.from(key),iv)
    decipher.update(passwordEncriptado)
    let passwordDes = decipher.final()
    console.log("****Desencriptar******")
    console.log(passwordDes.toString())
}
const passwordE = encriptar('Nico')
console.log(passwordE.toString('hex'))
hackerman(passwordE)
*/

//Dependencias
/*
npm init --yes
npm i moment
*/
import moment from 'moment'

console.log(moment())