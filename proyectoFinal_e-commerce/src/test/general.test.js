import 'dotenv/config';

import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

await mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DB conectada'))
	.catch(error => console.log(`Error en conexión a MongoDB Atlas:  ${error}`));

describe('Testing Aplicación', () => {
	describe('Test de registro de usuario', () => {
		let uid;
		it('Test endpoint /api/users, se espera que cree un usuario', async function () {
			this.timeout(5000);

			const newUser = {
				first_name: 'Lex',
				last_name: 'Luthor',
				email: 'lex@lex.com',
				age: 50,
				password: '1234',
			};

			const { _body } = await requester.post('/api/users').send(newUser);
			uid = _body.user._id;
			expect(_body.mensaje).to.equal('Usuario creado');
		});

	})
})

			

