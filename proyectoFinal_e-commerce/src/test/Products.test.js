import 'dotenv/config';

import productModel from '../models/products.models.js';
import chai from 'chai';
import mongoose from 'mongoose';

await mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DB conectada'))
	.catch(error => console.log(`Error en conexión a MongoDB Atlas:  ${error}`));

const expect = chai.expect;

describe('Testing Products con Chai', () => {
	beforeEach(function () {
		this.timeout(7000);
	});

	it('Ruta: /api/product/ metodo POST test todos los productos', async function () {
		const products = await productModel.find();
		expect(Array.isArray(products)).to.be.ok;
	});
});
