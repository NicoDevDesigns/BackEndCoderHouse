import { Router } from 'express';
import {getTickets, postTicket} from '../dao/controllers/tickets.controller.js'
     

const routerTicket = Router();

routerTicket.get('/', getTickets);
routerTicket.post('/', postTicket);


export default routerTicket;
