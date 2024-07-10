// src/routes/boxRouter.js
/**
 * Enrutador 
 * Endpoints
 */

// 1- Importamos el módulo
const express = require("express");

// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio boxesController (a realizarlo a futuro)
const boxController = require('../controllers/boxController');

// 4- En boxesController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al boxesController con el método específico para cada opción 

// Ruta de listado en general
router.get('/', boxController.getAllBoxes);
//Ruta para la consulta de Boxes por id
router.get('/:id_box', boxController.getBoxById);
//Ruta para crear un nuevo box
router.post('/', boxController.createBox);
//Ruta para actualizar un box
router.put('/:id_box', boxController.updateBox);
//Ruta para borrar un box
router.delete('/:id_box', boxController.deleteBox);

//5- Exportamos el módulo
module.exports = router;

//6- Pasamos a configurar boxController.js

