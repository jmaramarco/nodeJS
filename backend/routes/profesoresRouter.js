// src/routes/atletasRouter.js
/**
 * Enrutador 
 * Endpoints
 */

// 1- Importamos el módulo
const express = require("express");

// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio profesoresController (a realizarlo a futuro)
const profesoresController = require('../controllers/profesoresController');

// 4- En profesoresController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al profesoresController con el método específico para cada opción 

// Ruta de listado en general
router.get('/', profesoresController.getAllProfesores);
//Ruta para la consulta de Profesores por id
router.get('/:id_profesor', profesoresController.getProfesorById);
//Ruta para crear un nuevo Profesor
router.post('/', profesoresController.createProfesor);
//Ruta para actualizar un Profesor
router.put('/:id_profesor', profesoresController.updateProfesor);
//Ruta para borrar un Profesor
router.delete('/:id_profesor', profesoresController.deleteProfesor);

//5- Exportamos el módulo
module.exports = router;

//6- Pasamos a configurar ProfesoresController.js

