/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllBox
 * .getBoxById
 * .createBox
 * .updateBox
 * .deleteBox
 */

//1- Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.

const db = require("../db/db.js");

//2- .getAllBoxes
const getAllBoxes = (req, res)=>{
    // creamos una consulta
    const sql = 'SELECT * FROM boxes';

    //Eviamos la consulta a la bbdd
    db.query(sql, (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
};

//3- .getBoxById
const getBoxById = (req, res)=>{
    //1- Obtenemos la info de id que viene desde el cliente
    // const id = req.params.id;
    // Esta es una notacion de desestructuración {id}
    const {id_box} = req.params;

    // creamos la consulta
    // Creamos la consulta con marcador de posición ?
    const sql = 'SELECT * FROM boxes WHERE id_box = ?';

    // Enviamos la consulta a la bbdd
    db.query(sql,[id_box],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
}

//4- createBox
const createBox = (req, res)=>{
    // desestructuramos la req
    const {nom_box} = req.body;

    // creamos la consulta
    const sql = 'INSERT INTO boxes (nom_box) VALUES (?)';

    //Enviamos la consulta a la bbdd
    db.query(sql,[nom_box],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Box Añadido"})
    });
}

//5- updateBox
const updateBox = (req, res) => {
    // Desestructuración de la consulta
    const { id_box } = req.params;
    const { nom_box } = req.body;

    // Creamos la consulta SQL
    const sql = 'UPDATE boxes SET nom_box = ? WHERE id_box = ?';

    // Enviamos consulta a la bbdd
    db.query(sql, [nom_box, id_box], (err, result) => {
        // Si sucede algún error
        if (err) {
            console.error("Error al actualizar el Box:", err);
            return res.status(500).json({ mensaje: "Error al actualizar el Box" });
        }

        // Si no se encontró el Box
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Box no encontrado" });
        }

        // Si todo sale bien
        res.json({ mensaje: "Box actualizado" });
    });
};

//6 Delete
const deleteBox = (req, res)=>{
    // desestructuracion
    const {id_box} = req.params;

    //consulta sql
    const sql = 'DELETE FROM boxes WHERE id_box = ?';

    //pasamos la consulta
    db.query(sql, [id_box], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Box eliminado"})
        }

    )
}



//7- Exportamos los módulos
module.exports = {
    getAllBoxes,
    getBoxById,
    createBox,
    updateBox,
    deleteBox
}

// 8 Pasamos a configurar db.js