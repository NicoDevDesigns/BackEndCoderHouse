import {Router} from "express"
import CartManager from "../dao/MongoDB/cartManagerMongo.js"
import ProductManager from "../dao/MongoDB/productManagerMongo.js"
import cartModel from '../dao/models/carts.models.js'

const cartManager = new CartManager()
const productManager = new ProductManager()
 
const cartRouter =Router()

//Ingresar productos al carrito
cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params; 
  const quantity = req.body;
  console.log("el valor de quantity es: ",quantity)
  
  try {
      const addProductCart = await cartManager.addProduct(cid,pid,quantity)
      if(addProductCart){
        res.status(200).send({ resultado: 'Se actualizo el carrito', message: addProductCart })
      }else{
        res.status(404).send({ error: `Not found cart` })  
      }
       }catch(error){
        console.error("Error en cartRouter put:", error);
        res.status(500).send({ error: "Error interno del servidor" });
       }
  })
  
//eliminar del carrito el producto seleccionado
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    const {cid,pid}=req.params
    try {
      const deleteProduct = await cartManager.deleteProductCart(cid,pid)
      if (typeof deleteProduct === "string" && deleteProduct.startsWith("Error:")) {
        res.status(404).send({ error: deleteProduct });
    } else if (deleteProduct) {
        res.status(200).send({ resultado: 'Se eliminó el producto del carrito', message: deleteProduct });
    } else {
        res.status(404).send({ error: `No se encontró el carrito` });
    }
    } catch (error) {
      console.error("Error en cartRouter delete:", error);
      res.status(500).send({ error: "Error interno del servidor" });
    }
})

//Eliminar todos los productos del carrito
cartRouter.delete("/:cid",async(req,res) =>{

  const {cid} = req.params
 
  try{
  const deleteCartProducts = await cartManager.deleteCartAllProducts(cid)
  if(deleteCartProducts.products){
      res.status(200).send({ resultado: 'Se elimino todos los productos del carrito', message: deleteCartProducts })
  }else{
     res.status(404).send({ error: `No hay not found cart` })  
  }
}catch(error){
  console.error("Error en cartRouter delete:", error);
  res.status(500).send({ error: "Error interno del servidor" });
}
})

//Actualizar el carrito
cartRouter.put("/:cid", async (req, res) =>{
   
    const {cid}= req.params
    const {updateCart} = req.body
    console.log("El valor del body es: ",updateCart)
  
    try{
    const updateCartProducts = await cartManager.updateCartAll(cid,updateCart)
    if(updateCartProducts){
      res.status(200).send({ resultado: 'Se actualizo el carrito', message: updateCartProducts })
    }else{
      res.status(404).send({ error: `Not found cart` })  
    }
     }catch(error){
      console.error("Error en cartRouter put:", error);
      res.status(500).send({ error: "Error interno del servidor" });
     }
})

//Actualizar la cantidad del carrito
cartRouter.put("/:cid/products/:pid",async (req, res) => {
  const { cid, pid } = req.params;
	const { quantity } = req.body;

  try{
    const updateProduct = await cartManager.updateCartOneProduct(cid,pid, quantity)
    if(updateProduct){
      res.status(200).send({ resultado: 'Se actualizo el carrito', message: updateProduct })
    }else{
      res.status(404).send({ error: `Not found cart` })  
    }
     }catch(error){
      console.error("Error en cartRouter put:", error);
      res.status(500).send({ error: "Error interno del servidor" });
     }
})

export default cartRouter
