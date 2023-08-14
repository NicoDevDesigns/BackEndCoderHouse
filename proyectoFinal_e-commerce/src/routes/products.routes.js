
import { Router } from 'express'
import ProductManager from '../controllers/ProductManager.js';
//import { ProductManager } from './ProductManager.js'

const productManager = new ProductManager('src/models/productos.txt')

const routerProd = Router()



routerProd.get('/', async (req, res) => {
    const { limit } = req.query

    const prods = await productManager.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)

})

routerProd.get('/:id', async (req, res) => {
    const { id } = req.params
    const prod = await productManager.getProductById(parseInt(id))

    if (prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto no existente")
})


routerProd.post('/', async (req, res) => {

    const productData = req.body;

    if (!productData.title || !productData.description || !productData.code || !productData.price || !productData.stock || !productData.category) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const confirmacion = await productManager.addProduct(productData);

    if (confirmacion) {
        res.status(201).send('Producto agregado correctamente');
    } else {
        res.status(401).send('Error al agregar el producto');
    }

/*
    const confirmacion = await productManager.addProduct(req.body)

    if (confirmacion)
        res.status(200).send("Producto creado correctamente")
    else
        res.status(400).send("Producto ya existente")
    */
})

routerProd.put('/:id', async (req, res) => {

    const confirmacion = await productManager.updateProduct(req.params.id, req.body)

    if (confirmacion)
        res.status(200).send("Producto actualizado correctamente")
    else
        res.status(404).send("Producto no encontrado")

})

routerProd.delete('/:id', async (req, res) => {

    const confirmacion = await productManager.deleteProduct(req.params.id)

    if (confirmacion)
        res.status(200).send("Producto eliminado correctamente")
    else
        res.status(404).send("Producto no encontrado")
})

export default routerProd

/*
import { Router } from "express";
import ProductManager from "../ProductManager";

const routerProd = Router()

routerProd.get('/',async(req,res)=>{
    const {limit}= req.query

    const prods = await ProductManager.getProducts()
    const products = prods.slice(0,limit)
    res.status(200).send(products)
})



routerProd.get('/:id',async(req,res)=>{
    const {id}= req.params
    const prod = await ProductManager.getProductById(parseInt(id))

    if(prod)
        res.status(200).send(prod)
    else
        res.status(404).send("Producto no existente")
})



routerProd.post('/')
routerProd.put('/:id')
routerProd.delete('/:id')

export default routerProd
*/