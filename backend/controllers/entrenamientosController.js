/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllEntrenamientos
 * .getBoxById
 * .createBox
 * .updateBox
 * .deleteBox
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


//7- Exportamos los módulos 
module.exports = {
    getAllEntrenamientos,

}

// 8 Pasamos a configurar db.js