//Clase ProductManager es una clase que gestiona productos

class ProductManager {
    constructor() {
      this.productos = [];
      this.idContador = 1;
    }
  
    // Método para agregar un producto al arreglo "productos"
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("**********Error! los campos son obligatorios!*********");
        return;
      }
  
      // Validar que el campo "code" no esté repetido
      const codeExists = this.productos.some((product) => product.code === code);
      if (codeExists) {
        console.error("El código ya está registrado para otro producto.");
        return;
      }
  
      // Agregar el producto al arreglo "productos"
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
  
      console.log("Se agrego un nuevo producto:", product);
    }
    

    getproductos() {
        console.log("*******Todos los Productos del arreglo*****")
      return this.productos;
    }
  
    getProductById(id) {
      const product = this.productos.find((product) => product.id === id);
      if (product) {
        console.log("El producto encontrado por el Id es el siguiente:")
        return product;
      } else {
        console.log("El Id buscado no se encuentra!")
        console.error("Not found");
        return null;
      }
    }
  }
  

  const productManager = new ProductManager();
  
  // Agregar productos
  productManager.addProduct("Heladera Gafa", "equipo con freezer 326 lts", 1990000, "heladerGafa.jpg", "1", 300);
  productManager.addProduct("Heladera dream", "equipo con freezer 314 lts", 2490000, "heladerDream.jpg", "2", 200);
  
  // Obtener todos los productos
  console.log(productManager.getproductos());
  
  // Obtener un producto por su id
  console.log(productManager.getProductById(2)); 
  // Se pasa un Id incorrecto
  console.log(productManager.getProductById(3)); 
  