// src/routes/entrenamientosRouter.js
/**
 * Enrutador 
 * Endpoints
 */

// 1- Importamos el módulo
const express = require("express");

// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio boxesController (a realizarlo a futuro)
const entrenamientosController = require('../controllers/entrenamientosController');

// 4- En entrenamientosController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al entrenamientosController con el método específico para cada opción 

// Ruta de listado en general
router.get('/', entrenamientosController.getAllEntrenamientos);
// //Ruta para la consulta de Entrenamientos por id_entrenamiento
// router.get('/:id_entrenamiento', entrenamientosController.getEntrenamientoById);
// //Ruta para crear un nuevo entrenamiento
// router.post('/', entrenamientosController.createEntrenamiento);
// //Ruta para actualizar un Entrenamiento
// router.put('/:id_entrenamiento', entrenamientosController.updateEntrenamiento);
// //Ruta para borrar un Entrenamiento
// router.delete('/:id_Entrenamiento', entrenamientosController.deleteEntrenamiento);

//5- Exportamos el módulo
module.exports = router;

//6- Pasamos a configurar entrenamientosController.js

