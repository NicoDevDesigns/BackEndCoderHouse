import {Router} from "express"
import CartManager from "../dao/MongoDB/cartManagerMongo.js"

const cartManager = new CartManager()

const cartRouter =Router()

//Ingresar productos al carrito
cartRouter.post("/:cid/products/:pid", async (req, res) => {

  const { cid, pid } = req.params; 
  const quantity = req.body;
 
      try {
      const addNewProductCart = await cartManager.addProductCart(cid,pid,quantity)
      if(addNewProductCart){
        res.status(200).send({ resultado: 'Se agrego un producto al carrito', message: addNewProductCart })
      }else{
        res.status(404).send({ error: `Not found cart` })  
      }
       }catch(error){
        console.error("Error en cartRouter post:", error);
        res.status(500).send({ error: "Error interno del servidor" });
       }
  })
//Ingresar un carrito
cartRouter.post("/",async(req,res)=>{
  try {
    const addNewCart = await cartManager.addCart()
    if(addNewCart){
      res.status(200).send({ resultado: 'Se actualizo el carrito', message: addNewCart })
    }else{
      res.status(404).send({ error: `don't create cart!` })  
    }
  } catch (error) {
    console.error("Error en cartRouter post:", error);
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

//Actualizar el carrito con un arreglo
cartRouter.put("/:cid", async (req, res) =>{
     
    const {cid}= req.params
    const updateCart = req.body
 
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
  console.log("valor de quantity: ",quantity)

  try{
    const updateProduct = await cartManager.updateCartOneProduct(cid,pid, quantity)
    console.log("El valor de update: ", updateProduct)
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

//Mostrar todos los productos del carrito
cartRouter.get("/:cid",async(req,res)=>{
  const {cid} = req.params
  try {
    const showCart = await cartManager.showProductCar(cid)
  if(showCart){
    res.status(200).send({ resultado: 'Ok', message: showCart })
  }else{
    res.status(404).send({ error: `Not found cart` })  
  }
   }catch(error){
    console.error("Error en cartRouter get:", error);
    res.status(500).send({ error: "Error interno del servidor" });
   }
})

//Mostrar Carritos
cartRouter.get("/",async(req,res)=>{
  try {
    const showAllCarts = await cartManager.showAllCarts()
    if(showAllCarts){
      res.status(200).send({ resultado: 'Ok', message: showAllCarts })
    }else{
      res.status(404).send({ error: `Not found cart` })  
    }
  } catch (error) {
    console.error("Error en cartRouter get:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
})

export default cartRouter
