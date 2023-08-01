//importar el modulo fs para trabajar con sistema de archivos
//import fs from 'fs'; 
//const fs = require('fs');
import { promises } from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.idContador = 1;
    this.productos = [];

    // Al iniciar la instancia, se debe leer el archivo si existe y cargar los productos en memoria
    this._readFile();
  }

  async _readFile() {
    try {
      const data = await promises.readFile(this.path, 'utf8');
      if (data) {
        this.productos = JSON.parse(data);
        this.idContador = Math.max(...this.productos.map((product) => product.id)) + 1;
      }
    } catch (err) {
      // Si el archivo no existe o hay algún error, se asume que el archivo está vacío o no tiene el formato correcto
      console.error('Error while reading file:', err.message);
      console.error('Assuming an empty file or incorrect format. Starting with an empty list of products.');
      this.productos = [];
      this.idContador = 1;
    }
  }

  async _writeFile() {
    try {
      await promises.writeFile(this.path, JSON.stringify(this.productos, null, 2), 'utf8');
    } catch (err) {
      console.error('Error while writing file:', err.message);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Error! Todos los campos son obligatorios!");
      return;
    }

    const codeExists = this.productos.some((product) => product.code === code);
    if (codeExists) {
      console.error("El código ya está registrado para otro producto.");
      return;
    }

    const product = {
      id: this.idContador,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    this.productos.push(product);

    this.idContador++;

    this._writeFile(); // Escribir los productos en el archivo después de agregar uno nuevo

    console.log("Se agregó un nuevo producto:", product);
  }

  getProducts() {
    console.log("Todos los Productos del archivo:");
    return this.productos;
  }

  getProductById(id) {
    const product = this.productos.find((product) => product.id === id);
    if (product) {
      console.log("El producto encontrado por el ID es el siguiente:");
      return product;
    } else {
      console.error("Producto no encontrado");
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.productos.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      console.error("Producto no encontrado");
      return;
    }

    const updatedProduct = { ...this.productos[productIndex], ...updatedFields };
    this.productos[productIndex] = updatedProduct;

    this._writeFile(); // Escribir los productos en el archivo después de actualizar uno

    console.log("Producto actualizado:", updatedProduct);
  }

  deleteProduct(id) {
    this.productos = this.productos.filter((product) => product.id !== id);

    this._writeFile(); // Escribir los productos en el archivo después de eliminar uno

    console.log("Producto eliminado con éxito.");
  }
}

// Uso de la clase ProductManager
const productManager = new ProductManager('productos.txt');

// Agregar productos
productManager.addProduct("Heladera Gafa", "equipo con freezer 326 lts", 1990000, "heladeraGafa.jpg", "1", 300);
productManager.addProduct("Heladera Dream", "equipo con freezer 314 lts", 2490000, "heladeraDream.jpg", "2", 200);

// Obtener todos los productos
console.log(productManager.getProducts());

// Obtener un producto por su id
console.log(productManager.getProductById(2));

// Actualizar un producto
productManager.updateProduct(2, { title: "Nueva Heladera", price: 2790000 });

// Eliminar un producto
//productManager.deleteProduct(2);
