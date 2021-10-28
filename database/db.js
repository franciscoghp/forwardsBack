//2 - Invocamos a MySQL y realizamos la conexion
const mysql = require('mysql');

const connection = mysql.createConnection({
  //Con variables de entorno
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});

const dbConnection = async() => {
  try {
    connection.connect(()=>{
        console.log('¡Conectado a la Base de Datos!');
    });
  } catch (error) {
      console.error('El error de conexión es: ' + error);
  }


}


  module.exports = { dbConnection, connection };