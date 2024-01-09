import 'dotenv/config';

import cartModel from '../models/carts.models.js';
import Assert from 'assert';
import mongoose from 'mongoose';

await mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DB conectada'))
	.catch(error => console.log(`Error en conexión a MongoDB Atlas:  ${error}`));

const assert = Assert.strict;

describe('Test Cart', () => {
	beforeEach(function () {//limpiar la coleccion y para setear un tiempo máximo de resolución 
		this.timeout(5000);
	});

	it('Ruta: /api/carts/metodo POST test de nuevo carrito', async function () {
		const newCart = await cartModel.create({});
		assert.ok(newCart._id);
	});
});
