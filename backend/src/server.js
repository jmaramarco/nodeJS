// src/server.js
/**
 * Punto principal de acceso al servidor
 */

//1- Importamos express
const express = require('express');
const cors = require('cors'); // Importa el paquete cors

//2- Instanciamos express
const app = express();

//3- Importamos los modulos
const atletasRoutes = require('../routes/atletasRouter');
const boxRoutes = require('../routes/boxRouter');
const profesoresRoutes = require ('../routes/profesoresRouter');
const entrenamientosRoutes = require ('../routes/entrenamientosRouter');


//4- Declaramos el puerto
const PORT = 3000;
const SERVER_URL = `http://localhost:${PORT}`; 

//5- Uso del middleware .json que convierte el cuerpo de solicitud
// en algo accesible por js
app.use(express.json());

// Uso cors
app.use(cors());


//6- Prefijo principal de las rutas y delegación de las sub-rutas
app.use('/atletas', atletasRoutes);
app.use('/boxes', boxRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/entrenamientos', entrenamientosRoutes);

//7- Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

//8- Pasamos a configurar el router

