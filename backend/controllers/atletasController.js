/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllAtletas
 * .getAtletaById
 * .createAtleta
 * .updateAtleta
 * .deleteAtleta
 */

//1- Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.

const db = require("../db/db.js");

//2- .getAllAtletas
const getAllAtletas = (req, res)=>{
    // creamos una consulta
    const sql = 'SELECT * FROM atletas';

    //Eviamos la consulta a la bbdd
    db.query(sql, (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
};

//3- .getAtletaById
const getAtletaById = (req, res) => {
    const { id_atleta } = req.params;

    const sql = 'SELECT * FROM atletas WHERE id_atleta = ?';

    db.query(sql, [id_atleta], (err, result) => {
        if (err) {
            console.error('Error al obtener el atleta:', err);
            return res.status(500).json({ mensaje: 'Error al obtener el atleta' });
        }

        if (result.length === 0) {
            return res.status(404).json({ mensaje: 'Atleta no encontrado' });
        }

        res.json(result[0]); // Devuelve el primer atleta encontrado (debería ser único por ID)
    });
};

//4- createAtleta
const createAtleta = (req, res)=>{
    // desestructuramos la req
    const {nombre, apellido, dni, nacionalidad, fec_nac, peso, estatura, email, notificar, coments, id_genero} = req.body;

    // creamos la consulta
    const sql = 'INSERT INTO atletas (nombre, apellido, dni, nacionalidad, fec_nac, peso, estatura, email, notificar, coments, id_genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    //Enviamos la consulta a la bbdd
    db.query(sql,[nombre, apellido, dni, nacionalidad, fec_nac, peso, estatura, email, notificar, coments, id_genero],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Atleta Añadido"})
    });
}

//5- updateAtleta
const updateAtleta = (req, res) => {
    // Desestructuración de la consulta
    const { id_atleta } = req.params;
    const { nombre, apellido, dni, nacionalidad, fec_nac, peso, estatura, email, notificar, coments, id_genero } = req.body;

    // Creamos la consulta SQL
    const sql = 'UPDATE atletas SET nombre = ?, apellido = ?, dni = ?, nacionalidad = ?, fec_nac = ?, peso = ?, estatura = ?, email = ?, notificar = ?, coments = ?, id_genero = ? WHERE id_atleta = ?';

    // Enviamos consulta a la bbdd
    db.query(sql, [nombre, apellido, dni, nacionalidad, fec_nac, peso, estatura, email, notificar, coments, id_genero, id_atleta], (err, result) => {
        // Si sucede algún error
        if (err) {
            console.error("Error al actualizar el atleta:", err);
            return res.status(500).json({ mensaje: "Error al actualizar el atleta" });
        }

        // Si no se encontró el atleta
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Atleta no encontrado" });
        }

        // Si todo sale bien
        res.json({ mensaje: "Atleta actualizado" });
    });
};

//6 Delete
const deleteAtleta = (req, res)=>{
    // desestructuracion
    const {id_atleta} = req.params;

    //consulta sql
    const sql = 'DELETE FROM atletas WHERE id_atleta = ?';

    //pasamos la consulta
    db.query(sql, [id_atleta], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Atleta eliminado"})
        }

    )
}



//7- Exportamos los módulos
module.exports = {
    getAllAtletas,
    getAtletaById,
    createAtleta,
    updateAtleta,
    deleteAtleta
}

// 8 Pasamos a configurar db.js