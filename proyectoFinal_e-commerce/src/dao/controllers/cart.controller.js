import cartModel from "../models/carts.models.js";
import mongoose from 'mongoose';

export const getCarts = async (req, res) => {
    try {
        const showAllCarts = await cartModel.find();
        if(showAllCarts){
          res.status(200).send({ resultado: 'Ok', message: showAllCarts })
        }else{
          res.status(404).send({ error: `Not found carts`,message: showAllCarts })  
        }
      } catch (error) {
        console.error("Error en cartRouter get:", error);
        res.status(500).send({ error: "Error interno del servidor" });
      }
}

export const getCart = async (req, res) => {
  const {cid} = req.params
  try {
 
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      res.status(404).send({ error: `Error: el formato cid del carrito no es válido`}) 
  }          
  const showCart = await cartModel.findById(cid).populate('products.id_prod');

  if(showCart){
    res.status(200).send({ resultado: 'Ok', message: showCart })
    }else{
      res.status(404).send({ error: `Error`, message: showCart })  
    }
      }catch(error){
      console.error("Error en cartRouter get:", error);
      res.status(500).send({ error: "Error interno del servidor" });
    }
}

export const postCart = async (req, res) => {
  try {
        const addNewCart = await cartModel.create({})
    if(addNewCart){
      res.status(200).send({ resultado: 'Se agrego un carrito', message: addNewCart })
    }else{
      res.status(404).send({ error: `don't create cart!` })  
    }
  } catch (error) {
    console.error("Error en cartRouter post:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
}
export const postCartProduct = async (req, res) => {
      const { cid, pid } = req.params; 
      const quantity = req.body.quantity;
      try {
        if (!mongoose.Types.ObjectId.isValid(cid)) {
          return "Error: el formato del carrito no es válido";
            }            
        if (!mongoose.Types.ObjectId.isValid(pid)) {
      return "Error: el formato del producto no es válido";
            }
      const addNewProductCart = await cartModel.findById(cid);
      if(addNewProductCart){
        addNewProductCart.products.push({ id_prod: pid, quantity: quantity })                
        await addNewProductCart.save();
        res.status(200).send({ resultado: 'Se agrego un producto al carrito', message: addNewProductCart })
      }else{
        res.status(404).send({ error: `Error!`, message:addNewProductCart })  
      }
       }catch(error){
        console.error("Error en cartRouter post:", error);
        res.status(500).send({ error: "Error interno del servidor" });
       }
}
export const deleteCart = async (req, res) => {
      const {cid} = req.params
      try{
        
        if (!mongoose.Types.ObjectId.isValid(cid)) {
         res.status(404).send({ error: `Error: el formato cid del carrito no es válido`}) 
        } 
        const cartDelete = await cartModel.findByIdAndDelete(cid)
        if(cartDelete){
          res.status(200).send({ resultado: 'Se elimino el carrito', message: cartDelete })
        }else{
           res.status(404).send({ error: `Error`,menssage: cartDelete })  
        }
      }catch(error){
        console.error("Error en deleteCart:", error);
        res.status(500).send({ error: "Error interno del servidor" });
      }
}
export const deleteCartProduct = async (req, res) => {
    const {cid,pid}=req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            res.status(404).send({ error: `Error: el formato cid del carrito no es válido`}) 
        }            
        if (!mongoose.Types.ObjectId.isValid(pid)) {
            res.status(404).send({ error: `Error: el formato del producto no es válido`}) 
        }
      const deleteProductCart = await cartModel.findById(cid);

      if (deleteProductCart) {
        const index = deleteProductCart.products.findIndex(prod => prod.id_prod._id == pid);

        if (index!== -1) {
            const deleteProduct = deleteProductCart.products[index];
            deleteProductCart.products.splice(index, 1);
            await deleteProductCart.save();
            res.status(200).send({ resultado: 'Se eliminó el producto del carrito', message: deleteProduct });
        } else {
            res.status(404).send({ resultado:"Error: El producto no existe en el carrito"});
        }
    } else {
      res.status(404).send({ resultado:"Error: No se encontró el carrito"});
    }
    } catch (error) {
      console.error("Error en cartRouter delete:", error);
      res.status(500).send({ error: "Error interno del servidor" });
    }
}

export const deleteCartAllProducts = async (req, res) => {
  const {cid} = req.params
  try{
    
    if (!mongoose.Types.ObjectId.isValid(cid)) {
     res.status(404).send({ error: `Error: el formato cid del carrito no es válido`}) 
    } 
    const deleteProducts = await cartModel.findById(cid);    
    if(deleteProducts){    
        const deleteAll = await cartModel.findByIdAndUpdate(cid,{products:[]})
        res.status(200).send({ resultado: 'Se elimino todos los productos del carrito', message: deleteAll })
    }else{
        res.status(404).send({ error: `Error: El carrito no existe`})
         }
  }catch(error){
    //console.error("Error en deleteCartAllProducts:", error);
    res.status(500).send({ msg: "Error en deleteCartAllProducts", error: "Error interno del servidor" });
  }
}

export const putCart = async (req, res)=>{
    const {cid}= req.params
    const updateCart = req.body
 
    try{
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            res.status(404).send({ error: `Error: el formato del producto no es válido`}) 
        }
    const updateCartProducts = await cartModel.findById(cid)
    if(updateCartProducts){
        updateCart.forEach(prod => {
			const cartProduct = updateCartProducts.products.find(cartProd => cartProd.id_prod == prod.id_prod);
			if (cartProduct) {
				cartProduct.quantity += prod.quantity;
			} else {
				updateCartProducts.products.push(prod);
			} 
		    });
		    await updateCartProducts.save();
      res.status(200).send({ resultado: 'Se actualizo el carrito', message: updateCartProducts })
    }else{
      res.status(404).send({ error: `Error`,message: updateCartProducts })  
    }
     }catch(error){
      console.error("Error en cartRouter put:", error);
      res.status(500).send({ error: "Error interno del servidor" });
     }
}

export const putCartProduct = async (req, res) => {
    const { cid, pid } = req.params;
	const { quantity } = req.body;

  try{
    if (!mongoose.Types.ObjectId.isValid(cid)) {
        res.status(404).send({ error: `Error: el formato cid del carrito no es válido`}) 
    }            
    if (!mongoose.Types.ObjectId.isValid(pid)) {
        res.status(404).send({ error: `Error: el formato del producto no es válido`}) 
    }
    const updateProduct = await cartModel.findById(cid);
    if(updateProduct){
        const product = updateProduct.products.find(prod => prod.id_prod._id == pid);
        if (product!=undefined) {
            product.quantity += quantity;
            await updateProduct.save();
            res.status(200).send({ resultado: 'Se actualizo el carrito', message: updateProduct })
        }
    }else{
      res.status(404).send({ error: `Error`, message: updateProduct })  
    }
     }catch(error){
      console.error("Error en cartRouter put:", error);
      res.status(500).send({ error: "Error interno del servidor" });
     }
}
export const cartPurchase = async (req, res) => {
  const { cid } = req.params;
  try {
      const cart = await cartModel.findById(cid);
      const products = await productModel.find();
  
      if (cart) {
          const user = await userModel.findOne({ cart: cart._id });
          const email = user.email;
          let amount = 0;
          const purchaseItems = [];
          const productsNotPurchased = [];

          for (const item of cart.products) {
              const product = products.find(prod => prod._id == item.id_prod.toString());
              if (product.stock >= item.quantity) {
                  amount += product.price * item.quantity;
                  product.stock -= item.quantity;
                  await product.save();
                  purchaseItems.push(product.title);
              } else {
                  productsNotPurchased.push(item.id_prod); // Agregar ID de producto no comprado
              }
          }

          await cartModel.findByIdAndUpdate(cid, { products: productsNotPurchased });
          
          // Generar el ticket solo si hay productos comprados
          if (purchaseItems.length > 0) {
              const ticketResponse = await fetchTicketService(amount, email); // Debes implementar esta función
              res.status(200).send({ resultado: 'Compra completada', purchasedItems: purchaseItems, ticket: ticketResponse });
          } else {
              res.status(400).send({ message: 'No se compraron productos debido a la falta de stock' });
          }
      } else {
          res.status(404).send({ resultado: 'Not Found Cart', message: cart });
      } 
  } catch (error) {
      res.status(500).send({ error: `Error al procesar la compra: ${error}` });
  }
};
