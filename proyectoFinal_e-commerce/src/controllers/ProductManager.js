import { promises as fs } from 'fs'
export default class ProductManager{
    constructor(path){
    
    this.path=path
    this.products=[]
    }
    static incrementarId(){
        if(this.idIncrement){
            this.idIncrement++
        } else{
            this.idIncrement = 1
        }
        return this.idIncrement
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
        //Consulto si mi producto ya existe en el txt
        if (products.find(producto => producto.id == product.id)) {
            return false;
        }

        product.id = ProductManager.incrementarId()
        product.status= true;
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


