import { promises as fs } from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
    }
    static incrementarId(){
        if(this.idIncrement){
            this.idIncrement++
        } else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async getCarts() {
        try {
            const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'));
            return carts;
        } catch (error) {
            console.error('Error: ', error);
            return [];
        }
    }

    async addCart(cartData) {
        try {
            const carts = await this.getCarts();

            if (carts.find(cart => cart.id == cartData.id)) {
                return false;
            }
            // Generar un ID único para el carrito
            const id = CartManager.incrementarId();

            // Crear un nuevo carrito
            const newCart = {
                id,
                products: cartData.products || []
            };

            carts.push(newCart);    
            await fs.writeFile(this.path, JSON.stringify(carts));
            return true;
        } catch (error) {
            console.error('Error: ', error);
            return false;
        }
    }

    // Otros métodos...

    generateId(carts) {
        /*
        if (carts.length === 0) {
            return 1;
        }
        const maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
        return maxId + 1;
        */
        
            if(carts.id){
               carts.id++
            } else{
                carts.id = 1
            }
            return carts.id
        
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            const carts = await this.getCarts();
            const cartIndex = carts.findIndex(cart => cart.id == cartId);

            if (cartIndex === -1) {
                return false; // El carrito no existe
            }

            const existingProductIndex = carts[cartIndex].products.findIndex(product => product.id == productId);

            if (existingProductIndex === -1) {
                // Agregar un nuevo producto al carrito
                carts[cartIndex].products.push({ id: productId, quantity });
            } else {
                // Incrementar la cantidad del producto existente
                carts[cartIndex].products[existingProductIndex].quantity += quantity;
            }

            await fs.writeFile(this.path, JSON.stringify(carts));
            return true;
        } catch (error) {
            console.error('Error: ', error);
            return false;
        }
    }

}
