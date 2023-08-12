import { promises as fs } from 'fs'
export default class ProductManager{
    constructor(path){
    
    this.path=path
    this.products=[]
    }

    async getProducts () {
        try{
            const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            //console.log(productos)
            return productos
        } catch(error){
            //console.error('Error: ',error)
        }
    }

   async getProductById(id){
        //En el productManager, la ruta esta en this.path
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = products.find(producto => producto.id === id)
        return prod
    }

    async addProduct(product){
        //Consulto el txt y lo parseo
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        //console.log("*****************", products[1].title)
        //Consulto si mi producto ya existe en el txt
        if (products.find(producto => producto.id == product.id)) {
            return false;
        }
        //Lo agrego al array al ya saber que no existe
        products.push(product)
        //Parsearlo y guardar el array modificado
        await fs.writeFile(this.path, JSON.stringify(products))
        return true;
    }
    async updateProduct(id,nombre){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(prod => prod.id === id)
    
        if (indice != -1) {
            //Mediante el indice modifico todos los atributos de mi objeto
            products[indice].title = nombre
            //Resto de los atributos presentes
            await fs.writeFile(this.path, JSON.stringify(products))

            return true; // Retorna true para indicar éxito en la actualización
        } else {
            return false; // Retorna false si el producto no se encontró
        }
    }

    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.id != id)
        await fs.writeFile(this.path, JSON.stringify(prods))

        return prods.length < products.length; // Devuelve true si se eliminó un producto, false si no se encontró          
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
