import cartModel from "../models/carts.models.js"

export default class CartManager {



    addProductCart = async(cid,pid,quantity)=>{
        try{
            const cart = await cartModel.findById(cid);
            console.log("valor de quantity en addProduct: ",quantity)
            if (cart) {
                cart.products.push({ id_prod: pid, quantity: quantity })
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
                return respuesta
            }
             }catch(error){
            console.error("Error en addProductCart", error);
            }
    }

    addCart = async()=>{
        try{
        const newCart = cartModel.create({})
        return newCart
        }catch(error){
            console.error("Error en updateCartOneProduct", error);
        }
    }

        /*

*/        
         

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
//eliminar del carrito el producto seleccionado
deleteProductCart = async(cid,pid)=>{
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const index = cart.products.findIndex(prod => prod.id_prod._id == pid);
            //console.log("el valor del index es: ",index)
            //console.log("el carrito es: ",cart.products[index])
            if (index!== -1) {
                const deletedProduct = cart.products[index];
                cart.products.splice(index, 1);
                await cart.save();
                return deletedProduct;
            } else {
                return "Error: El producto no existe en el carrito";
            }
        } else {
            return "Error: No se encontró el carrito";
        }
    } catch (error) {
        console.error("Error en deleteProductCart", error);
        throw new Error("No existe ese producto"); // Propaga la excepción para que pueda ser manejada en la función principal
    }
        /*
        if (cart) {
            for (let i = 0; i < cart.products.length; i++) {
                const producto = cart.products[i];
                const idProd = producto.id_prod._id.toString(); // Convierte el ObjectId a una cadena
                console.log(`Valor de id_prod del producto ${i}: ${idProd}`);
            }
        }
        */
}

//Actualizar el carrito
updateCartAll = async(cid, updateCart)=>{
    try {
        const cart = await cartModel.findById(cid);
        updateCart.forEach(prod => {
			const cartProduct = cart.products.find(cartProd => cartProd.id_prod._id == prod.id_prod);
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
//Actualizar la cantidad del carrito
updateCartOneProduct = async(cid,pid, quantity)=>{
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
			const product = cart.products.find(prod => prod.id_prod._id == pid);
			if (product) {
				product.quantity += quantity;
                await cart.save();
			} else {
				return "Error: El producto no existe en el carrito";
			}	
    }else{
        return "Error: No se encontró el carrito";
    }
} catch (error) {
        console.error("Error en updateCartOneProduct", error);
    }
}

};

