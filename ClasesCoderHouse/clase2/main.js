//ECMA7
/*
let numero=5;

console.log(Math.pow(numero,3));
console.log(numero**3);

const equipo = [
    "Nico","Leo","magu"
]
if(equipo.includes("Nic")){
    console.log("Encontre a Nico")
}else{
    console.log("No se encontro")
}
*/
/*
const empleados = [
    {nombre: "Nico",apellido: "sanchez",sueldo:2340000},
    {nombre: "lex",apellido: "luthor",sueldo:23423453},
    {nombre: "Leo",apellido: "elfo",sueldo:234463563}
]
const empleados1 = empleados[0];
console.log(Object.keys(empleados1));
console.log(Object.values(empleados1));
console.log(Object.entries(empleados1));
*/
/*
ECMA9
function sumar(...num){
    console.log(num.reduce((prev,act)=>prev+act,0))
    console.log(...num);
}
sumar(5,5,10,30);
*/
//ECMA10
/*
let nombre = " francisco  ";
console.log("largo de la cadena:", nombre.length)
let cadenaSinVacios = nombre.trim();
console.log("largo sin espacios: ",cadenaSinVacios.length);
*/
/*
const facturas =  [5,10,50,[10,10]];
const facturasPisadas = facturas.flat();
console.log(facturasPisadas);

let opcion = 1;
if(opcion==1){
    import('./sumar.js').then(modulo =>{
        modulo.default(5,10);
    })
}
*/
/*
let opcion = "restar";
if(opcion=="sumar"){
    import('./calculadora.js').then(modulo =>{
        modulo.sumar(5,10);
    })
}else if(opcion=="restar"){
    import('./calculadora.js').then(modulo =>{
        modulo.restar(5,10);
    })
}else{
    console.log("No hay opcion");
}
*/
//ECMA11
const sueldos =[500,100,300,undefined,700];
let acum = 0;
sueldos.forEach((sueldo,indice)=>{
    acum+=sueldo ?? 0
    if(!sueldo){
        console.log("Error de valor en posicion: ",indice+1);
    }
})