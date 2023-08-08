import { promises as fs } from 'fs'
export default class ProductManager{
    constructor(path){
    
    this.path=path
    this.products=[]
    }
/*
    getProducts(){
        return this.products
    }
    */
    async getProducts () {
        try{
            const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            //console.log(productos)
            return productos
        } catch(error){
            //console.error('Error: ',error)
        }
    }
    /*
    getProductById(id){
        let product = this.products.find(prod => prod.id == id)
        if(product){
            return product
        }
        return "Not found"
    }
    */

   async getProductById(id){
        //En el productManager, la ruta esta en this.path
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = products.find(producto => producto.id === id)
        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no existe")
        }
    }


   /* addProducts(product){

        if (!product.title || !product.descripcion || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("**********Error! los campos son obligatorios!*********");
            return;
        }
          
          //console.log(product.title);


        if(this.products.find(prod => prod.code == product.code)){
            return "El producto ya existe"
        }
        if(product.code != "" || product.stock >= 0){
            this.products.push(product)
        } else{
            return "No puedo cargar un producto vacio"
        }
    }*/
    async addProduct(product){
        //Consulto el txt y lo parseo
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        //console.log("*****************", products[1].title)
        //Consulto si mi producto ya existe en el txt
        if (products.find(producto => producto.id == product.id)) {
            return "Producto ya agregado"
        }
        //Lo agrego al array al ya saber que no existe
        products.push(product)
        //Parsearlo y guardar el array modificado
        await fs.writeFile(this.path, JSON.stringify(products))
    }
    async updateProduct(id,nombre){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(prod => prod.id === id)
    
        if (indice != -1) {
            //Mediante el indice modifico todos los atributos de mi objeto
            products[indice].title = nombre
            //Resto de los atributos presentes
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log("Producto no encontrado")
        }
    }

    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.id != id)
        await fs.writeFile(this.path, JSON.stringify(prods))
    }
}
class Product {
    constructor(title,descripcion,price,thumbnail,code,stock){
        this.title=title
        this.descripcion=descripcion
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock=stock
        this.id = Product.incrementarId()
    }
    static incrementarId(){
        if(this.idIncrement){
            this.idIncrement++
        } else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}
const producto1 = new Product("moto zanella","patagonia eagle 150",1000000,"nico","3",1000)
const producto2 = new Product("moto mondial","mondial 250",2000000,"leo","4",500)
const producto3 = new Product("moto corven","Corven Indiana 256",3000000,"reb","5",300)
const producto4 = new Product("harley-davidson","softailStandard 1746 cc",10000000000,"Lex","6",10)

//console.log(producto1)
//console.log(producto2)

//const productManager = new ProductManager('./productos.txt')

//productManager.addProduct(producto4)
//productManager.addProduct(producto2)

//console.log(productManager.getProducts())
//console.log(productManager.getProductById(2))

//productManager.updateProduct(1,"Mundo")

//console.log(productManager.getProductById(1))

//productManager.deleteProduct(1)
