import cartModel from "../models/carts.models";
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

