/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllProfesores
 * .getProfesorById
 * .createProfesor
 * .updateProfesor
 * .deleteProfesor
 */

//1- Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.

const db = require("../db/db.js");

//2- .getAllProfesores
const getAllProfesores = (req, res)=>{
    // creamos una consulta
    const sql = 'SELECT * FROM profesores';

    //Eviamos la consulta a la bbdd
    db.query(sql, (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
};

//3- .getProfesorById
const getProfesorById = (req, res)=>{
    //1- Obtenemos la info de id que viene desde el cliente
    // const id = req.params.id;
    // Esta es una notacion de desestructuración {id}
    const {id_profesor} = req.params;

    // creamos la consulta
    // Creamos la consulta con marcador de posición ?
    const sql = 'SELECT * FROM profesores WHERE id_profesor = ?';

    // Enviamos la consulta a la bbdd
    db.query(sql,[id_profesor],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
}

//4- createProfesor
const createProfesor = (req, res)=>{
    // desestructuramos la req
    const {nombre, apellido, dni, nacionalidad, fec_nac, calle, nro_dom, cod_postal, localidad, provincia, pais, tel} = req.body;

    // creamos la consulta
    const sql = 'INSERT INTO profesores (nombre, apellido, dni, nacionalidad, fec_nac, calle, nro_dom, cod_postal, localidad, provincia, pais, tel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    //Enviamos la consulta a la bbdd
    db.query(sql,[nombre, apellido, dni, nacionalidad, fec_nac, calle, nro_dom, cod_postal, localidad, provincia, pais, tel],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Profesor Añadido"})
    });
}

//5- updateProfesor
const updateProfesor = (req, res) => {
    // Desestructuración de la consulta
    const { id_profesor } = req.params;
    const { nombre, apellido, dni, nacionalidad, fec_nac, calle, nro_dom, cod_postal, localidad, provincia, pais, tel } = req.body;

    // Log the values for debugging
    console.log('ID Profesor:', id_profesor);
    console.log('Body:', req.body);

    // Creamos la consulta SQL
    const sql = 'UPDATE profesores SET nombre = ?, apellido = ?, dni = ?, nacionalidad = ?, fec_nac = ?, calle = ?, nro_dom = ?, cod_postal = ?, localidad = ?, provincia = ?, pais = ?, tel = ? WHERE id_profesor = ?';

    // Enviamos consulta a la bbdd
    db.query(sql, [nombre, apellido, dni, nacionalidad, fec_nac, calle, nro_dom, cod_postal, localidad, provincia, pais, tel, id_profesor], (err, result) => {
        // Si sucede algún error
        if (err) {
            console.error("Error al actualizar el Profesor:", err);
            return res.status(500).json({ mensaje: "Error al actualizar el Profesor" });
        }

        // Si no se encontró el profesor
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Profesor no encontrado" });
        }

        // Si todo sale bien
        res.json({ mensaje: "Profesor actualizado" });
    });
};

//6 Delete
const deleteProfesor = (req, res)=>{
    // desestructuracion
    const {id_profesor} = req.params;

    //consulta sql
    const sql = 'DELETE FROM profesores WHERE id_profesor = ?';

    //pasamos la consulta
    db.query(sql, [id_profesor], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Profesor eliminado"})
        }

    )
}



//7- Exportamos los módulos
module.exports = {
    getAllProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor
}

// 8 Pasamos a configurar db.js