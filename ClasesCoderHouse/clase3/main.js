/*
let nombre = "Nicolas";
console.log(nombre);
console.log(`Hola mundo soy ${nombre}`)
*/

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
