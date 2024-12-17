const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });  // Cargar variables de entorno desde el archivo .env

// Función para conectar a la base de datos
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false // Opcional, si usas una versión moderna de mongoose
    });
    console.log('BD Conectada');
  } catch (error) {
    console.log(error);
    process.exit(1); // Detener la app en caso de error
  }
};

// Definir el esquema de productos
const productoSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  ubicacion: String,
  precio: Number,
  fechaCreacion: { type: Date, default: Date.now },
});

const Producto = mongoose.model('Producto', productoSchema);

// Lista de productos a insertar
const productosData = [
  { nombre: "Manzana", categoria: "Frutas", ubicacion: "Huánuco", precio: 2.5 },
  { nombre: "Pera", categoria: "Frutas", ubicacion: "Ica", precio: 3.0 },
  { nombre: "Platano", categoria: "Frutas", ubicacion: "Tingo María", precio: 1.8 },
  { nombre: "Naranja", categoria: "Frutas", ubicacion: "Piura", precio: 2.0 },
  { nombre: "Papa", categoria: "Verduras", ubicacion: "Cusco", precio: 1.2 },
  { nombre: "Lechuga", categoria: "Verduras", ubicacion: "Lima", precio: 0.8 },
  { nombre: "Tomate", categoria: "Verduras", ubicacion: "Arequipa", precio: 1.5 },
  { nombre: "Cebolla", categoria: "Verduras", ubicacion: "Chiclayo", precio: 1.0 },
  { nombre: "Pollo", categoria: "Carnes", ubicacion: "Lima", precio: 15.0 },
  { nombre: "Res", categoria: "Carnes", ubicacion: "Huacho", precio: 20.0 },
  { nombre: "Trucha", categoria: "Pescados", ubicacion: "Puno", precio: 12.0 },
  { nombre: "Tilapia", categoria: "Pescados", ubicacion: "Amazonas", precio: 10.5 },
  { nombre: "Arroz", categoria: "Granos", ubicacion: "Lambayeque", precio: 3.5 },
  { nombre: "Quinua", categoria: "Granos", ubicacion: "Cusco", precio: 7.5 },
  { nombre: "Lentejas", categoria: "Granos", ubicacion: "Moquegua", precio: 4.5 },
  { nombre: "Café", categoria: "Bebidas", ubicacion: "Junín", precio: 12.0 },
  { nombre: "Cerveza", categoria: "Bebidas", ubicacion: "Lima", precio: 6.0 },
  { nombre: "Jugo de Naranja", categoria: "Bebidas", ubicacion: "Piura", precio: 4.0 },
  { nombre: "Gaseosa", categoria: "Bebidas", ubicacion: "Lima", precio: 3.5 },
  { nombre: "Chocolate", categoria: "Dulces", ubicacion: "Cusco", precio: 5.0 },
  { nombre: "Caramelos", categoria: "Dulces", ubicacion: "Lima", precio: 1.5 },
  { nombre: "Miel", categoria: "Dulces", ubicacion: "Amazonas", precio: 8.0 },
  { nombre: "Yogurt", categoria: "Lácteos", ubicacion: "Arequipa", precio: 3.5 },
  { nombre: "Queso", categoria: "Lácteos", ubicacion: "Cajamarca", precio: 10.0 },
  { nombre: "Leche", categoria: "Lácteos", ubicacion: "Lima", precio: 2.0 },
  { nombre: "Helado", categoria: "Lácteos", ubicacion: "Lima", precio: 6.0 },
  { nombre: "Pan", categoria: "Panadería", ubicacion: "Lima", precio: 1.0 },
  { nombre: "Pastel", categoria: "Panadería", ubicacion: "Arequipa", precio: 15.0 },
  { nombre: "Galletas", categoria: "Panadería", ubicacion: "Lima", precio: 2.5 },
  { nombre: "Huevos", categoria: "Proteínas", ubicacion: "Chiclayo", precio: 4.5 },
  { nombre: "Tocino", categoria: "Proteínas", ubicacion: "Lima", precio: 8.0 },
  { nombre: "Aceite", categoria: "Despensa", ubicacion: "Piura", precio: 6.0 },
  { nombre: "Azúcar", categoria: "Despensa", ubicacion: "Lambayeque", precio: 2.5 },
  { nombre: "Sal", categoria: "Despensa", ubicacion: "Arequipa", precio: 1.0 },
  { nombre: "Harina", categoria: "Despensa", ubicacion: "Lima", precio: 3.0 },
  { nombre: "Avena", categoria: "Granos", ubicacion: "Cusco", precio: 4.0 },
  { nombre: "Vino", categoria: "Bebidas", ubicacion: "Ica", precio: 25.0 },
  { nombre: "Pescado Seco", categoria: "Pescados", ubicacion: "Piura", precio: 18.0 }
];

// Función para insertar los productos
async function insertarProductos() {
  try {
    // Conectar a la base de datos
    await conectarDB();

    // Insertar productos
    const resultado = await Producto.insertMany(productosData);
    console.log(`${resultado.length} productos insertados correctamente.`);
  } catch (err) {
    console.error('Error al insertar productos:', err);
  } finally {
    mongoose.connection.close(); // Cerrar la conexión después de insertar
  }
}

// Llamar a la función para insertar los productos
insertarProductos();
