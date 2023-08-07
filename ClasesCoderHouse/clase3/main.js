/*
let nombre = "Nicolas";
console.log(nombre);
console.log(`Hola mundo soy ${nombre}`)

const elemento = document.getElementById("boton");
elemento.addEventListener("click",()=>{

});
const numeros= [4,5,10,20]
numeros.forEach((numeros)=>console.log(numeros));



const sueldos =[1000,3000,1500,4000];

const consultarSueldos = (confirmar)=>{
    return new Promise((resolve,reject)=>{
        if(confirmar){
            resolve(sueldos);
        }
        reject("Acceso denegado")
    })
}
//console.log(consultarSueldos(false))(
consultarSueldos(false)
    .then(datosSueldos=>console.log(datosSueldos))
    .catch(error=>console.log(`Error en consultar sueldos`,error))
    .finally(console.log("Operacion finalizada"))

fetch("http://criptoya.com/api/dolar")
    .then(response =>response.json())
    //.then(dolar=>console.log(dolar)) 
    .then(({solidario,mep,blue,ccl})=>{
        console.log(solidario,mep,blue,ccl)
    })
*/
const consultarDolar = async ()=>{
    const promise = await fetch("http://criptoya.com/api/dolar")
    const datosDolar = await promise.json()
    console.log(datosDolar)
} 
consultarDolar();
