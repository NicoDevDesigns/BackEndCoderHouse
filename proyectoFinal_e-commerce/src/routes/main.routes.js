import { Router } from "express";
import cartRouter from './cartController.routes.js'
import productRouter from "./productsController.routes.js";
import sessionRouter from "./sessions.routes.js";
import userRouter from "./users.routes.js";
import routerTicket from "./tickets.routes.js";
/* 
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'; // Importa el enrutador del carrito
import userRouter from './routes/users.routes.js'
import sessionRouter from './routes/sessions.routes.js'
*/

const router = Router()

router.use('/api/product', productRouter)
router.use('/api/user', userRouter)
router.use('/api/carts', cartRouter)
router.use('/api/sessions', sessionRouter)
router.use('/api/tickets', routerTicket)

export default router