/**
 * Finalmente el archivo db.js será el que cree el objeto que conecta con la base de datos. 
 * Esa conexión utilizará el objeto mysql provisto en en el módulo mysql2
 */

//1 Importamos el modulo mysql2
const mysql = require("mysql2");

//2- Configuramos conexion a la bd
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    port: 3306,
});

// conexion
connection.connect((err)=>{
    // En caso de error
    if(err){
        console.log("Error de conexion con el servidor: "+err);
        return;
    }

    // En caso OK
    console.log("Estado de conexion: CONECTADA");

    // Creamos una consulta
    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS crossfit_db';

    // pasamos la consulta a la db
    connection.query(sqlCreatedb,(err, results)=>{
        //En caso de error
        if(err){
            console.log("Error de conexion con el servidor: "+err);
            return;
        }

        //exito
        console.log("Base de datos: CREADA/EXISTENTE/GARANTIZADA")


        // TABLAS
        connection.changeUser({database: "crossfit_db"}, (err)=>{
            if(err){
                console.log("Error al cambiar a la base de datos crossfit_db: "+err);
                return;
            }

            // Generamos la consulta para crear la tabla Generos
            const createGenerosQuery = `
            CREATE TABLE IF NOT EXISTS generos (
                id_genero INT AUTO_INCREMENT PRIMARY KEY,
                nom_genero VARCHAR(45) NOT NULL
            );
        `;
            // Pasamos la consulta
            connection.query(createGenerosQuery,(err, results)=>{
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla Generos: ', err);
                    return;
                }
            //Éxito
                console.log(`Tabla: Generos CREADA/EXISTENTE/GARANTIZADA`);
            });
            
            
            
            
            // Generamos la consulta para crear la tabla atletas
            const createAtletasQuery = `
            CREATE TABLE IF NOT EXISTS atletas (
                id_atleta INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(75) NOT NULL,
                apellido VARCHAR(75) NOT NULL,
                dni VARCHAR(10) NOT NULL,
                nacionalidad VARCHAR(50) NOT NULL,
                fec_nac DATE NOT NULL,
                peso FLOAT NOT NULL,
                estatura FLOAT NOT NULL, 
                email VARCHAR(45) NOT NULL,
                notificar BOOLEAN NOT NULL,
                coments VARCHAR (144) NOT NULL,
                id_genero INT NOT NULL,
                FOREIGN KEY (id_genero) REFERENCES generos(id_genero)
            );
        `;
            // Pasamos la consulta
            connection.query(createAtletasQuery,(err, results)=>{
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla Atletas: ', err);
                    return;
                }
            //Éxito
                console.log(`Tabla: Atletas CREADA/EXISTENTE/GARANTIZADA`);
            });
            
                       

            // Generamos la consulta para crear la tabla Profesores
            const createProfesoresQuery = `
            CREATE TABLE IF NOT EXISTS profesores (
                id_profesor INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50) NOT NULL,
                apellido VARCHAR(50) NOT NULL,
                dni VARCHAR(10) NOT NULL,
                nacionalidad VARCHAR(50) NOT NULL,
                fec_nac DATE,
                calle VARCHAR(45),
                nro_dom VARCHAR(45),
                cod_postal VARCHAR(45),
                localidad VARCHAR(45),
                tel VARCHAR(20)
            );
        `;
            // Pasamos la consulta
            connection.query(createProfesoresQuery,(err, results)=>{
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla Profesores: ', err);
                    return;
                }
            //Éxito
                console.log(`Tabla: Profesores CREADA/EXISTENTE/GARANTIZADA`);
            })

            // Generamos la consulta para crear la tabla Boxes
            const createBoxesQuery = `
            CREATE TABLE IF NOT EXISTS boxes (
                id_box INT AUTO_INCREMENT PRIMARY KEY,
                nom_box VARCHAR(45) NOT NULL
            );
        `;
            // Pasamos la consulta
            connection.query(createBoxesQuery,(err, results)=>{
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla Boxes: ', err);
                    return;
                }
            //Éxito
                console.log(`Tabla: Boxes CREADA/EXISTENTE/GARANTIZADA`);
            })

            // Generamos la consulta para crear la tabla tipos_entrenamiento
            const createTipos_entrenamiento = `
            CREATE TABLE IF NOT EXISTS tipos_entrenamiento (
                id_tipo_entrenamiento INT AUTO_INCREMENT PRIMARY KEY,
                nom_entrenamiento VARCHAR(45) NOT NULL,
                id_box INT,
                FOREIGN KEY (id_box) REFERENCES boxes(id_box)
            );
        `;
            // Pasamos la consulta
            connection.query(createTipos_entrenamiento,(err, results)=>{
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla tipos_entrenamiento: ', err);
                    return;
                }
            //Éxito
                console.log(`Tabla: tipos_entrenamiento CREADA/EXISTENTE/GARANTIZADA`);
            })
        })
            // Generamos la consulta para crear la tabla entrenamientos
            const createEntrenamientosTable = `
            CREATE TABLE IF NOT EXISTS entrenamientos (
                id_entrenamientos INT AUTO_INCREMENT PRIMARY KEY,
                dias_entrena INT NOT NULL,
                compite BOOLEAN NOT NULL,
                id_tipo_entrenamiento INT,
                id_profesor INT,
                id_atleta INT,
                FOREIGN KEY (id_tipo_entrenamiento) REFERENCES tipos_entrenamiento(id_tipo_entrenamiento),
                FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor),
                FOREIGN KEY (id_atleta) REFERENCES atletas(id_atleta)
            );
          `;

          connection.query(createEntrenamientosTable, (err, results) => {
            if (err) {
              console.error('Error al crear la tabla entrenamientos: ', err);
              return;
            }
            console.log(`Tabla: Entrenamientos CREADA/EXISTENTE/GARANTIZADA`);

            
          });



    })
})


//Exportacion del modulo
module.exports = connection;