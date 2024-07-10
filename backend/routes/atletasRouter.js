// src/routes/atletasRouter.js
/**
 * Enrutador 
 * Endpoints
 */

// 1- Importamos el módulo
const express = require("express");

// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio atletasController (a realizarlo a futuro)
const atletasController = require('../controllers/atletasController');

// 4- En atletasController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al atletasController con el método específico para cada opción 

// Ruta de listado en general
router.get('/', atletasController.getAllAtletas);
//Ruta para la consulta de Atletas por id
router.get('/:id_atleta', atletasController.getAtletaById);
//Ruta para crear un nuevo Atleta
router.post('/', atletasController.createAtleta);
//Ruta para actualizar un Atleta
router.put('/:id_atleta', atletasController.updateAtleta);
//Ruta para borrar un Atleta
router.delete('/:id_atleta', atletasController.deleteAtleta);

//5- Exportamos el módulo
module.exports = router;

//6- Pasamos a configurar atletasController.js

