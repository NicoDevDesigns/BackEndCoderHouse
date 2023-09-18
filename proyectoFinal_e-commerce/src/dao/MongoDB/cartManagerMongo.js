import cartModel from "../models/carts.models.js"
import ProductManager from "../MongoDB/productManagerMongo.js"

//const pm = new ProductManager()

export default class CartManager {

    addProduct = async(cid)=>{
        const cart = cartModel.findById(cid)
        if (cart) {
            cart.products.push({ id_prod: pid, quantity: 3 })
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
            return respuesta
        }
    }

//Eliminar todos los productos del carrito
deleteCartAllProducts = async(cid)=>{
    try{
    const cartDelete = await cartModel.findByIdAndUpdate(cid,{products:[]})
    return cartDelete
    }catch(error){
        console.error("Error en deleteCartAllProducts", error);
        //throw error;
    }
}

//Actualizar el carrito
updateCartAll = async(cid, updateCart)=>{
    try {
        const cart = await cartModel.findById(cid);
        updateCart.forEach(prod => {
			const cartProduct = cart.products.find(cartProd => cartProd.id_prod == prod.id_prod);
			if (cartProduct) {
				cartProduct.quantity += prod.quantity;
			} else {
				cart.products.push(prod);
			}
		});
		await cart.save();
        return cart
    } catch (error) {
        console.error("Error en updateCartAll", error);
    }
}

};








/*
    getCarts = async () => {
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            console.error('Error carga de carritos:', error.message);
            return [];
        }
    };
    

    getCartById = async (cartId) => {
        try {
            const cart = await cartModel.findById(cartId);
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito por ID:',error );
            return error;
        }
    };
    
    addCart = async (products) => {
        try {
            
            let cartData = {};
            if (products && products.length > 0) {
                cartData.products = products;
            }
            
            const cart = await cartModel.create(products);
            return cart;
        } catch (err) {
            console.error('Error carga de datos:', err.message);
            return err;
        }
    };
    
    addProductInCart = async (cid, obj) => {
        try {
            const filter = { _id: cid, "products._id": obj._id };
            const cart = await cartModel.findById(cid);
            const findProduct = cart.products.some((product) => product._id.toString() === obj._id);
    
            if (findProduct) {
                const update = { $inc: { "products.$.quantity": obj.quantity } };
                await cartModel.updateOne(filter, update);
            } else {
                const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
                await cartModel.updateOne({ _id: cid }, update);
            }
    
            return await cartModel.findById(cid);
        } catch (err) {
            console.error('Error al agregar el producto al carrito:', err.message);
            return err;
        }
    };
    
*/


//export default CartManager;