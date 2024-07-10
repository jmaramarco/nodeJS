/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllEntrenamientos
 * .createEntrenamiento
 */

//1- Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.

const db = require("../db/db.js");

//2- .getAllEntrenamientos
const getAllEntrenamientos = (req, res)=>{
    // creamos una consulta
    const sql = `
SELECT 
    e.id_atleta,
    e.id_entrenamientos,
    e.dias_entrena,
    e.compite,
    a.nombre AS atleta_nombre,
    a.apellido AS atleta_apellido,
    p.nombre AS profesor_nombre,
    p.apellido AS profesor_apellido,
    t.nom_entrenamiento,
    b.nom_box
FROM 
    entrenamientos e
JOIN 
    atletas a ON e.id_atleta = a.id_atleta
JOIN 
    profesores p ON e.id_profesor = p.id_profesor
JOIN 
    tipos_entrenamiento t ON e.id_tipo_entrenamiento = t.id_tipo_entrenamiento
JOIN 
    boxes b ON t.id_box = b.id_box;

    `;

    //Eviamos la consulta a la bbdd
    db.query(sql, (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
};

    //2- createEntrenamiento
const createEntrenamiento = (req, res)=>{
    const { dias_entrena, compite, id_tipo_entrenamiento, id_profesor, id_atleta } = req.body;
    const sql = `INSERT INTO entrenamientos (dias_entrena, compite, id_tipo_entrenamiento, id_profesor, id_atleta) VALUES (?, ?, ?, ?, ?)`

    //Enviamos la consulta a la bbdd
    db.query(sql,[dias_entrena, compite, id_tipo_entrenamiento, id_profesor, id_atleta], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Entrenamiento Añadido"})
    });
};

//7- Exportamos los módulos 
module.exports = {
    getAllEntrenamientos,
    createEntrenamiento
}