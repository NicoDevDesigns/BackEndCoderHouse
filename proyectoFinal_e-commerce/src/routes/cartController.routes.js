import { Router } from "express";
import {getCarts, getCart} from '../dao/controllers/cart.controller.js'

const cartRouter =Router()

cartRouter.get('/', getCarts)
cartRouter.get('/:cid', getCart)


export default cartRouter