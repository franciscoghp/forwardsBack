const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/db');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.path = {
            auth   : '/api/auth',
            companies: '/api/companies',
            ships: '/api/ships'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.companies, require('../routes/companies'));
        this.app.use( this.path.ships, require('../routes/ships'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;
